import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { categoryMapper } from "./category.mapper";
import { CategoryOptionDto } from "./dto/category-option.dto";
import { GetCategoriesQuery } from "./schemas/get-categories.schema";
import { CategoriesResponseDto } from "./dto/categories-response.dto";
import { CreateCategoryBody } from "./schemas/create-category.schema";
import { CategoryDto } from "../category/dto/category.dto";
import { ConflictError } from "../../errors/conflict.error";
import { UpdateCategoryBody } from "./schemas/update-category.schema";
import { NotFoundError } from "../../errors/not-found.error";
function buildWhere(filters: GetCategoriesQuery): Prisma.CategoryWhereInput {
  const where: Prisma.CategoryWhereInput = {};

  if (filters.search) {
    where.name = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  return where;
}

function buildOrderBy(
  filters: GetCategoriesQuery,
): Prisma.CategoryOrderByWithRelationInput {
  return {
    [filters.sortBy]: filters.sortDirection,
  };
}

function buildPagination(filters: GetCategoriesQuery) {
  return {
    skip: (filters.page - 1) * filters.pageSize,
    take: filters.pageSize,
  };
}

async function findAll(
  filters: GetCategoriesQuery,
): Promise<CategoriesResponseDto> {
  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters);
  const pagination = buildPagination(filters);

  const [categories, totalItems] = await Promise.all([
    prisma.category.findMany({
      where,
      orderBy,
      ...pagination,
    }),
    prisma.category.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / filters.pageSize);

  return {
    data: categoryMapper.toDtoList(categories),
    meta: {
      page: filters.page,
      pageSize: filters.pageSize,
      totalItems,
      totalPages,
    },
  };
}

async function findOptions(): Promise<CategoryOptionDto[]> {
  const options = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return categoryMapper.toOptionDtoList(options);
}

async function create(body: CreateCategoryBody): Promise<CategoryDto> {
  await ensureCategoryDoesNotExist(body.name);

  const category = await prisma.category.create({
    data: {
      name: body.name,
    },
  });

  return categoryMapper.toDto(category);
}

async function update(
  id: number,
  body: UpdateCategoryBody,
): Promise<CategoryDto> {
  const existingCategory = await findOrThrow(id);

  if (existingCategory.name !== body.name) {
    await ensureCategoryDoesNotExist(body.name);
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      name: body.name,
    },
  });

  return categoryMapper.toDto(updatedCategory);
}

async function remove(id: number): Promise<void> {
  await findOrThrow(id);

  await prisma.category.delete({
    where: { id },
  });
}

async function ensureCategoryDoesNotExist(name: string) {
  const category = await prisma.category.findUnique({
    where: { name },
  });

  if (category) {
    throw new ConflictError(`Category "${name}" already exists.`);
  }
}

async function findOrThrow(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new NotFoundError(`Category with id ${id} not found.`);
  }

  return category;
}

export const categoryService = {
  findOptions,
  findAll,
  create,
  update,
  remove,
  findOrThrow,
};

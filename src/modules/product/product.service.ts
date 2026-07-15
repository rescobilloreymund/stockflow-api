import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { productMapper } from "./product.mapper";
import { ProductsResponseDto } from "./dto/products-response.dto";
import { GetProductsQuery } from "./schemas/get-products.schema";
import { ConflictError } from "../../errors/conflict.error";
import { CreateProductBody } from "./schemas/create-product.schema";
import { ProductDto } from "./dto/product.dto";
import { categoryService } from "../category/category.service";
import { supplierService } from "../supplier/supplier.service";
import { NotFoundError } from "../../errors/not-found.error";
import { UpdateProductBody } from "./schemas/update-product.schema";

function buildWhere(filters: GetProductsQuery): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = {};

  if (filters.search) {
    where.name = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  if (filters.categoryId !== undefined) {
    where.categoryId = filters.categoryId;
  }

  if (filters.status !== undefined) {
    where.status = filters.status;
  }

  return where;
}

function buildOrderBy(
  filters: GetProductsQuery,
): Prisma.ProductOrderByWithRelationInput {
  return {
    [filters.sortBy]: filters.sortDirection,
  };
}

function buildPagination(filters: GetProductsQuery) {
  return {
    skip: (filters.page - 1) * filters.pageSize,
    take: filters.pageSize,
  };
}

async function findAll(
  filters: GetProductsQuery,
): Promise<ProductsResponseDto> {
  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters);
  const pagination = buildPagination(filters);

  const [products, totalItems] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      ...pagination,
    }),
    prisma.product.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / filters.pageSize);

  return {
    data: productMapper.toDtoList(products),
    meta: {
      page: filters.page,
      pageSize: filters.pageSize,
      totalItems,
      totalPages,
    },
  };
}

async function create(body: CreateProductBody): Promise<ProductDto> {
  await ensureProductDoesNotExist(body.sku);

  await categoryService.findOrThrow(body.categoryId);

  await supplierService.findOrThrow(body.supplierId);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      sku: body.sku,
      cost: body.cost,
      price: body.price,
      status: body.status,
      categoryId: body.categoryId,
      supplierId: body.supplierId,
    },
  });

  return productMapper.toDto(product);
}

async function update(
  id: number,
  body: UpdateProductBody,
): Promise<ProductDto> {
  const existingProduct = await findOrThrow(id);
  if (body.sku !== existingProduct.sku) {
    await ensureProductDoesNotExist(body.sku);
  }

  await categoryService.findOrThrow(body.categoryId);

  await supplierService.findOrThrow(body.supplierId);

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      sku: body.sku,
      cost: body.cost,
      price: body.price,
      status: body.status,
      categoryId: body.categoryId,
      supplierId: body.supplierId,
    },
  });

  return productMapper.toDto(updatedProduct);
}

async function remove(id: number): Promise<void> {
  await findOrThrow(id);

  await prisma.product.delete({
    where: { id },
  });
}

async function ensureProductDoesNotExist(sku: string) {
  const product = await prisma.product.findUnique({
    where: { sku },
  });

  if (product) {
    throw new ConflictError(`Product SKU "${sku}" already exists.`);
  }
}

async function findOrThrow(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found.`);
  }

  return product;
}

export const productService = {
  findAll,
  create,
  update,
  remove,
  findOrThrow,
};

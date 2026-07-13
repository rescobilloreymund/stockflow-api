import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { productMapper } from "./product.mapper";

import { GetProductsQuery } from "./schemas/get-products.schema";

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
async function findAll(filters: GetProductsQuery) {
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

export const productSerivce = {
  findAll,
};

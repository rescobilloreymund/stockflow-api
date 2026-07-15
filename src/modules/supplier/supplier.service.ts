import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client";
import { supplierMapper } from "./supplier.mapper";
import { SupplierOptionDto } from "./dto/supplier-option.dto";
import { SupplierDto } from "./dto/supplier.dto";
import { NotFoundError } from "../../errors/not-found.error";
import { GetSuppliersQuery } from "./schemas/get-suppliers.schema";
import { SuppliersResponseDto } from "./dto/supplier-response.dto";
import { CreateSupplierBody } from "./schemas/create-supplier.schema";
import { UpdateSupplierBody } from "./schemas/update-supplier.schema";
import { ConflictError } from "../../errors/conflict.error";

function buildWhere(filters: GetSuppliersQuery): Prisma.SupplierWhereInput {
  const where: Prisma.SupplierWhereInput = {};

  if (filters.search) {
    where.name = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  return where;
}

function buildOrderBy(
  filters: GetSuppliersQuery,
): Prisma.SupplierOrderByWithRelationInput {
  return {
    [filters.sortBy]: filters.sortDirection,
  };
}

function buildPagination(filters: GetSuppliersQuery) {
  return {
    skip: (filters.page - 1) * filters.pageSize,
    take: filters.pageSize,
  };
}

async function findAll(
  filters: GetSuppliersQuery,
): Promise<SuppliersResponseDto> {
  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters);
  const pagination = buildPagination(filters);

  const [suppliers, totalItems] = await Promise.all([
    prisma.supplier.findMany({
      where,
      orderBy,
      ...pagination,
    }),
    prisma.supplier.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / filters.pageSize);

  return {
    data: supplierMapper.toDtoList(suppliers),
    meta: {
      page: filters.page,
      pageSize: filters.pageSize,
      totalItems,
      totalPages,
    },
  };
}

async function findOptions(): Promise<SupplierOptionDto[]> {
  const options = await prisma.supplier.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return supplierMapper.toOptionDtoList(options);
}

async function create(body: CreateSupplierBody): Promise<SupplierDto> {
  await ensureSupplierDoesNotExist(body.name);

  const supplier = await prisma.supplier.create({
    data: body,
  });

  return supplierMapper.toDto(supplier);
}

async function update(
  id: number,
  body: UpdateSupplierBody,
): Promise<SupplierDto> {
  const supplierExist = await findOrThrow(id);

  if (supplierExist.name !== body.name) {
    await ensureSupplierDoesNotExist(body.name);
  }

  const supplier = await prisma.supplier.update({
    where: { id },
    data: body,
  });

  return supplierMapper.toDto(supplier);
}

async function remove(id: number): Promise<void> {
  await findOrThrow(id);
  await prisma.supplier.delete({
    where: { id },
  });
}

async function ensureSupplierDoesNotExist(name: string): Promise<void> {
  const supplier = await prisma.supplier.findUnique({
    where: { name },
  });

  if (supplier) {
    throw new ConflictError(`Supplier "${name}" already exists.`);
  }
}

async function findOrThrow(id: number) {
  const supplier = await prisma.supplier.findUnique({
    where: { id },
  });

  if (!supplier) {
    throw new NotFoundError(`Supplier with id ${id} not found.`);
  }

  return supplier;
}

export const supplierService = {
  findOptions,
  findOrThrow,
  findAll,
  create,
  update,
  remove,
};

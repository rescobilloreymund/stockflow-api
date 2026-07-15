import { prisma } from "../../lib/prisma";
import { supplierMapper } from "./supplier.mapper";
import { SupplierOptionDto } from "./dto/supplier-option.dto";
import { SupplierDto } from "./dto/supplier.dto";
import { NotFoundError } from "../../errors/not-found.error";

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
};

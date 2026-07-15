import { Supplier } from "../../generated/prisma/client";
import {
  SupplierOptionDto,
  SupplierOptionRecord,
} from "./dto/supplier-option.dto";
import { SupplierDto } from "./dto/supplier.dto";

function toDto(supplier: Supplier): SupplierDto {
  return {
    id: supplier.id,
    name: supplier.name,
    contactName: supplier.contactName,
    phone: supplier.phone,
    email: supplier.email,
    address: supplier.address,
    createdAt: supplier.createdAt.toISOString(),
    updatedAt: supplier.updatedAt.toISOString(),
  };
}

function toDtoList(suppliers: Supplier[]): SupplierDto[] {
  return suppliers.map(toDto);
}

function toOptionDto(supplier: SupplierOptionRecord): SupplierOptionDto {
  return {
    value: supplier.id,
    label: supplier.name,
  };
}

function toOptionDtoList(
  suppliers: SupplierOptionRecord[],
): SupplierOptionDto[] {
  return suppliers.map(toOptionDto);
}

export const supplierMapper = {
  toDto,
  toDtoList,
  toOptionDto,
  toOptionDtoList,
};

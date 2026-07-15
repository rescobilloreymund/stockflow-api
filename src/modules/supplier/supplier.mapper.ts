import {
  SupplierOptionDto,
  SupplierOptionRecord,
} from "./dto/supplier-option.dto";

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
  toOptionDto,
  toOptionDtoList,
};

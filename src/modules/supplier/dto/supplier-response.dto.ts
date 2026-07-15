import { PaginationMetaDto } from "../../../dto/pagination-meta.dto";
import { SupplierDto } from "./supplier.dto";

export interface SuppliersResponseDto {
  data: SupplierDto[];
  meta: PaginationMetaDto;
}

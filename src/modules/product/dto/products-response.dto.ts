import { PaginationMetaDto } from "../../../dto/pagination-meta.dto";
import { ProductDto } from "./product.dto";

export interface ProductsResponseDto {
  data: ProductDto[];
  meta: PaginationMetaDto;
}

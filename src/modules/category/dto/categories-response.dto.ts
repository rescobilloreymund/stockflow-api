import { PaginationMetaDto } from "../../../dto/pagination-meta.dto";
import { CategoryDto } from "./category.dto";

export interface CategoriesResponseDto {
  data: CategoryDto[];
  meta: PaginationMetaDto;
}

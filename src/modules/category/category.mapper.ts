import { Category } from "../../generated/prisma/client";
import { CategoryOptionDto } from "./dto/category-option.dto";
import { CategoryOptionRecord } from "./types/category.types";

import { CategoryDto } from "./dto/category.dto";

function toDto(category: Category): CategoryDto {
  return {
    id: category.id,
    name: category.name,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  };
}

function toDtoList(categories: Category[]): CategoryDto[] {
  return categories.map(toDto);
}

function toOptionDto(category: CategoryOptionRecord): CategoryOptionDto {
  return {
    value: category.id,
    label: category.name,
  };
}

function toOptionDtoList(
  categories: CategoryOptionRecord[],
): CategoryOptionDto[] {
  return categories.map(toOptionDto);
}

export const categoryMapper = {
  toDto,
  toDtoList,
  toOptionDto,
  toOptionDtoList,
};

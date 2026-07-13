import { Product } from "../../generated/prisma/client";
import { ProductDto } from "./dto/product.dto";

function toDto(product: Product): ProductDto {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    cost: Number(product.cost),
    price: Number(product.price),
    status: product.status,
    categoryId: product.categoryId,
    supplierId: product.supplierId,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function toDtoList(products: Product[]) {
  return products.map(toDto);
}

export const productMapper = {
  toDto,
  toDtoList,
};

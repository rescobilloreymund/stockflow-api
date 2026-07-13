import { ProductStatus } from "../../../generated/prisma/enums";

export interface ProductDto {
  id: number;
  name: string;
  sku: string;
  cost: number;
  price: number;
  status: ProductStatus;
  categoryId: number;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
}

import { z } from "zod";
import { ProductStatus } from "../../../generated/prisma/enums";

export const updateProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required."),
  sku: z.string().trim().min(1, "SKU is required."),
  categoryId: z.number().positive("Category is required."),
  supplierId: z.number().positive("Supplier is required."),
  cost: z.number().nonnegative("Cost must be non-negative."),
  price: z.number().nonnegative("Price must be non-negative."),
  status: z.enum(ProductStatus),
});

export type UpdateProductBody = z.infer<typeof updateProductSchema>;

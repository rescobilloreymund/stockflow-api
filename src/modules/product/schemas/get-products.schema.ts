import { z } from "zod";

import { ProductStatus } from "../../../generated/prisma/enums";
import { PRODUCT_SORT_FIELDS } from "../constants/product.constants";

export const getProductsSchema = z.object({
  search: z.string().trim().optional(),

  categoryId: z.coerce.number().int().positive().optional(),

  status: z.enum(ProductStatus).optional(),

  page: z.coerce.number().int().positive().default(1),

  pageSize: z.coerce.number().int().positive().max(100).default(10),

  sortBy: z.enum(PRODUCT_SORT_FIELDS).default("createdAt"),

  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export type GetProductsQuery = z.infer<typeof getProductsSchema>;

import { z } from "zod";

import { SUPPLIER_SORT_FIELDS } from "../constants/supplier.constants";

export const getSuppliersSchema = z.object({
  search: z.string().trim().optional(),

  page: z.coerce.number().int().positive().default(1),

  pageSize: z.coerce.number().int().positive().max(100).default(10),

  sortBy: z.enum(SUPPLIER_SORT_FIELDS).default("createdAt"),

  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export type GetSuppliersQuery = z.infer<typeof getSuppliersSchema>;

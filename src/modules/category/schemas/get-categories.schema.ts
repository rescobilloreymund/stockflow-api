import { z } from "zod";

import { CATEGORY_SORT_FIELDS } from "../constants/category.constants";

export const getCategoriesSchema = z.object({
  search: z.string().trim().optional(),

  page: z.coerce.number().int().positive().default(1),

  pageSize: z.coerce.number().int().positive().max(100).default(10),

  sortBy: z.enum(CATEGORY_SORT_FIELDS).default("createdAt"),

  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export type GetCategoriesQuery = z.infer<typeof getCategoriesSchema>;

import { z } from "zod";

export const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
});

export type UpdateCategoryBody = z.infer<typeof updateCategorySchema>;

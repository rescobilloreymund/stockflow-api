import { Router } from "express";
import { categoryController } from "./category.controller";
import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middlewares/validate.middleware";
import { getCategoriesSchema } from "./schemas/get-categories.schema";
import { createCategorySchema } from "./schemas/create-category.schema";
import { updateCategorySchema } from "./schemas/update-category.schema";
import { idParamSchema } from "../../schemas/id-param.schema";
const router = Router();

router.get(
  "/",
  validate(getCategoriesSchema, "query"),
  asyncHandler(categoryController.findAll),
);
router.post(
  "/",
  validate(createCategorySchema, "body"),
  asyncHandler(categoryController.create),
);

router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateCategorySchema, "body"),
  asyncHandler(categoryController.update),
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(categoryController.remove),
);
router.get("/options", asyncHandler(categoryController.findOptions));

export default router;

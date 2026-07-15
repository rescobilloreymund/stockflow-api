import { Router } from "express";
import { productController } from "./product.controller";
import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middlewares/validate.middleware";
import { getProductsSchema } from "./schemas/get-products.schema";
import { createProductSchema } from "./schemas/create-product.schema";
import { updateCategorySchema } from "../category/schemas/update-category.schema";
import { idParamSchema } from "../../schemas/id-param.schema";
import { updateProductSchema } from "./schemas/update-product.schema";

const router = Router();

router.get(
  "/",
  validate(getProductsSchema, "query"),
  asyncHandler(productController.findAll),
);

router.post(
  "/",
  validate(createProductSchema, "body"),
  asyncHandler(productController.create),
);

router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateProductSchema, "body"),
  asyncHandler(productController.update),
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(productController.remove),
);

export default router;

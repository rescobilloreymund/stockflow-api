import { Router } from "express";
import { productController } from "./product.controller";
import { asyncHandler } from "../../utils/async-handler";
import { validateQuery } from "../../middlewares/validate-query.middleware";
import { getProductsSchema } from "./schemas/get-products.schema";

const router = Router();

router.get(
  "/",
  validateQuery(getProductsSchema),
  asyncHandler(productController.findAll),
);

export default router;

import { Router } from "express";
import { supplierController } from "./supplier.controller";
import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middlewares/validate.middleware";
import { getSuppliersSchema } from "./schemas/get-suppliers.schema";
import { createSupplierSchema } from "./schemas/create-supplier.schema";
import { updateSupplierSchema } from "./schemas/update-supplier.schema";
import { idParamSchema } from "../../schemas/id-param.schema";

const router = Router();
router.get(
  "/",
  validate(getSuppliersSchema, "query"),
  asyncHandler(supplierController.findAll),
);
router.post(
  "/",
  validate(createSupplierSchema, "body"),
  asyncHandler(supplierController.create),
);
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateSupplierSchema, "body"),
  asyncHandler(supplierController.update),
);
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(supplierController.remove),
);
router.get("/options", asyncHandler(supplierController.findOptions));

export default router;

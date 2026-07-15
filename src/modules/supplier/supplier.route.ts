import { Router } from "express";
import { supplierController } from "./supplier.controller";
import { asyncHandler } from "../../utils/async-handler";

const router = Router();

router.get("/options", asyncHandler(supplierController.findOptions));

export default router;

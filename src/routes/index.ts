import { Router } from "express";
import healthRoutes from "./health.routes";
import productRoutes from "../modules/product/product.route";
import categoryRoutes from "../modules/category/category.route";
import supplierRoutes from "../modules/supplier/supplier.route";
const router = Router();

router.use("/health", healthRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);
export default router;

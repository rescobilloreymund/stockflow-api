import { Router } from "express";
import healthRoutes from "./health.routes";
import productRoutes from "../modules/product/product.route";
const router = Router();

router.use("/health", healthRoutes);
router.use("/products", productRoutes);
export default router;

import { Router } from "express";
import { NotFoundError } from "../errors/NotFoundError";

import { prisma } from "../lib/prisma";
const router = Router();

router.get("/", async (_req, res) => {
  const products = await prisma.product.findMany();

  return res.json(products);
});

export default router;

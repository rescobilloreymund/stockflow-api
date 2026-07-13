import { Request, Response } from "express";

import { productSerivce } from "./product.service";
import { GetProductsQuery } from "./schemas/get-products.schema";

async function findAll(req: Request, res: Response) {
  const filters = req.validatedQuery as GetProductsQuery;

  const products = await productSerivce.findAll(filters);

  return res.json(products);
}

export const productController = {
  findAll,
};

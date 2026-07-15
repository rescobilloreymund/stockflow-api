import { Request, Response } from "express";

import { productService } from "./product.service";
import { GetProductsQuery } from "./schemas/get-products.schema";
import { CreateProductBody } from "./schemas/create-product.schema";
import { UpdateProductBody } from "./schemas/update-product.schema";
import { IdParams } from "../../schemas/id-param.schema";

async function findAll(req: Request, res: Response) {
  const filters = req.validatedQuery as GetProductsQuery;

  const products = await productService.findAll(filters);

  return res.json(products);
}

async function create(req: Request, res: Response) {
  const body = req.validatedBody as CreateProductBody;

  const product = await productService.create(body);

  return res.json(product);
}

async function update(req: Request, res: Response) {
  const body = req.validatedBody as UpdateProductBody;
  const { id } = req.validatedParams as IdParams;

  const product = await productService.update(id, body);

  return res.json(product);
}

async function remove(req: Request, res: Response) {
  const { id } = req.validatedParams as IdParams;

  await productService.remove(id);

  return res.sendStatus(204);
}

export const productController = {
  findAll,
  create,
  update,
  remove,
};

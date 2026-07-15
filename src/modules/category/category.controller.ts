import { Request, Response } from "express";

import { categoryService } from "./category.service";
import { GetCategoriesQuery } from "./schemas/get-categories.schema";
import { CreateCategoryBody } from "./schemas/create-category.schema";
import { UpdateCategoryBody } from "./schemas/update-category.schema";
import { IdParams } from "../../schemas/id-param.schema";

async function findAll(req: Request, res: Response) {
  const filters = req.validatedQuery as GetCategoriesQuery;
  const categories = await categoryService.findAll(filters);
  return res.json(categories);
}

async function findOptions(req: Request, res: Response) {
  const options = await categoryService.findOptions();

  return res.json(options);
}

async function create(req: Request, res: Response) {
  const body = req.validatedBody as CreateCategoryBody;

  const category = await categoryService.create(body);

  return res.status(201).json(category);
}

async function update(req: Request, res: Response) {
  const { id } = req.validatedParams as IdParams;
  const body = req.validatedBody as UpdateCategoryBody;

  const category = await categoryService.update(id, body);

  return res.status(200).json(category);
}

async function remove(req: Request, res: Response) {
  const { id } = req.validatedParams as IdParams;

  await categoryService.remove(id);

  return res.status(204).send();
}

export const categoryController = {
  findOptions,
  findAll,
  create,
  update,
  remove,
};

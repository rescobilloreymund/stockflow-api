import { Request, Response } from "express";

import { supplierService } from "./supplier.service";
import { GetSuppliersQuery } from "./schemas/get-suppliers.schema";
import { CreateSupplierBody } from "./schemas/create-supplier.schema";
import { UpdateSupplierBody } from "./schemas/update-supplier.schema";
import { IdParams } from "../../schemas/id-param.schema";

async function findAll(req: Request, res: Response) {
  const filters = req.validatedQuery as GetSuppliersQuery;
  const suppliers = await supplierService.findAll(filters);
  return res.json(suppliers);
}

async function create(req: Request, res: Response) {
  const body = req.validatedBody as CreateSupplierBody;
  const supplier = await supplierService.create(body);
  return res.status(201).json(supplier);
}

async function update(req: Request, res: Response) {
  const { id } = req.validatedParams as IdParams;
  const body = req.validatedBody as UpdateSupplierBody;
  const supplier = await supplierService.update(id, body);
  return res.json(supplier);
}

async function remove(req: Request, res: Response) {
  const { id } = req.validatedParams as IdParams;
  await supplierService.remove(id);
  return res.sendStatus(204);
}

async function findOptions(req: Request, res: Response) {
  const options = await supplierService.findOptions();

  return res.json(options);
}

export const supplierController = {
  findOptions,
  findAll,
  create,
  update,
  remove,
};

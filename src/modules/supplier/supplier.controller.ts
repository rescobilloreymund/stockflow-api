import { Request, Response } from "express";

import { supplierService } from "./supplier.service";

async function findOptions(req: Request, res: Response) {
  const options = await supplierService.findOptions();

  return res.json(options);
}

export const supplierController = {
  findOptions,
};

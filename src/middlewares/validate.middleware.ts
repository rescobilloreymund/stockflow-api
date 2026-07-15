import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { ValidationTarget } from "../types/validation-target";

export function validate<T>(schema: ZodType<T>, target: ValidationTarget) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return next(result.error);
    }

    switch (target) {
      case "query":
        req.validatedQuery = result.data;
        break;
      case "body":
        req.validatedBody = result.data;
        break;
      case "params":
        req.validatedParams = result.data;
        break;
    }

    next();
  };
}

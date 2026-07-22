import { NextFunction, Request, Response } from "express";
import { type ZodType } from "zod";

export const CategoryValidation = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            message: "Validation failed.",
            errors: result.error.flatten().fieldErrors
        });
    }

    req.body = result.data;
    next();
}

export default CategoryValidation;
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const Validation = (schema: ZodType, target: "body" | "params" | "query") => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if(!result.success) {
        return res.status(400).json({
            message: "Validation failed.",
            errors: result.error.flatten().fieldErrors
        });
    }

    if(target === "body") {
        req.body = result.data;
    }

    next();
};
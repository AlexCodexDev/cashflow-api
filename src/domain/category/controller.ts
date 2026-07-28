import { Request, Response } from "express";
import * as Services from "./services.js";
import { CategoryBody, CategoryParams } from "./schema.js";

export const GetAllCategoryController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllCategoryServices(req.query);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        })
    }
}

export const GetCategoryByCode = async (req: Request<CategoryParams>, res: Response)  => {
    const { code } = req.params;
    
    try {
        const result = await Services.GetCategoryByCode(code);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        })
    }
}

export const CreateCatgoryController = async (req: Request<{}, {}, CategoryBody>, res: Response) => {
    try {
        const result = await Services.CreateCategoryServices(req.body);

        return res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}

export const UpdateCategoryController = async (req: Request<CategoryParams>, res: Response) => {
    const { code } = req.params;
    try {
        const result = await Services.UpdateCategoryServices(req.body, code);

        return res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}

export const DeleteCategoryController = async (req: Request<CategoryParams>, res: Response) => {
    const { code } = req.params;
    try {
        const result = await Services.DeleteCategoryServices(code);

        return res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}
import { Request, Response } from "express";
import * as Services from "./services.js";
import { CategoryBody, CategoryFilters } from "./schema.js";
import { CheckCodeTypes, CheckFinanceBookCodeTypes } from "../../types/types.js";

export const GetAllCategoryController = async (req: Request<{}, {}, {}, CategoryFilters>, res: Response) => {
    try {
        const result = await Services.GetAllCategoryServices(req.query);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetCategoryByCodeController = async (req: Request<CheckCodeTypes>, res: Response)  => {
    const code = req.params;
    
    try {
        const result = await Services.GetCategoryByCodeServices(code);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetCategoryByFinanceBookCodeController = async (req: Request<CheckFinanceBookCodeTypes>, res: Response) => {
    const code = req.params;

    try {
        const result = await Services.GetCategoryByFinanceBookCodeServices(code);
        console.log(result);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const CreateCatgoryController = async (req: Request<{}, {}, CategoryBody>, res: Response) => {
    try {
        const result = await Services.CreateCategoryServices(req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const UpdateCategoryController = async (req: Request<CheckCodeTypes, {}, CategoryBody>, res: Response) => {
    const code = req.params;
    const data = req.body;

    try {
        const result = await Services.UpdateCategoryServices(code, data);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const DeleteCategoryController = async (req: Request<CheckCodeTypes>, res: Response) => {
    const code = req.params;

    try {
        const result = await Services.DeleteCategoryServices(code);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}
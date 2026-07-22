import { Request, Response } from "express";
import * as Services from "./services.js";

export const GetAllCategoryController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllCategoryServices();

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        })
    }
}

export const GetCategoryByCode = async (req: Request, res: Response)  => {
    const code = req.params.id as string;
    
    try {
        const result = await Services.GetCategoryByCode(code);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        })
    }
}

export const CreateCatgoryController = async (req: Request, res: Response) => {
    try {
        const result = await Services.CreateCategoryServices(req.body);

        return res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}
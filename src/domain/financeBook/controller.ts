import { Request, Response } from "express";
import * as Services from "./services.js";
import { FinanceBookFilter, FinanceBookParams, FinanceBookTypes } from "./schema.js";

export const GetAllFinanceBookController = async (req: Request<{}, {}, {}, FinanceBookFilter>, res: Response) => {
    try {
        const result = await Services.GetAllFinanceBookServices(req.query);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetFinanceBookByCodeController = async (req: Request<FinanceBookParams>, res: Response) => {
    try {
        const result = await Services.GetFinanceBookByCodeServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const CreateFinanceBookController = async (req: Request<{}, {}, FinanceBookTypes>, res: Response) => {
    try {
        const result = await Services.CreateFinanceBookServices(req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const UpdateFinanceBookController = async (req: Request<FinanceBookParams, {}, FinanceBookTypes>, res: Response) => {
    try {
        const result = await Services.UpdateFinanceBOokServices(req.params, req.body);
        return res.status(201).json(result);
    } catch(error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}
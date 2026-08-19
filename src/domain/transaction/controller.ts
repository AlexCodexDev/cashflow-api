import { Request, Response } from "express";
import * as Services from "./services.js";
import { TransactionBody } from "./schema.js";
import { CheckCodeTypes } from "../../types/types.js";

export const GetAllTransactionController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllTransactionServices();
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetTransactionByCodeController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.GetTransactionByCodeServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const CreateTransactionController = async (req: Request<{}, {}, TransactionBody>, res: Response) => {
    try {
        const result = await Services.CreateTransactionServices(req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const UpdateTransactionController = async (req: Request<CheckCodeTypes, {}, TransactionBody>, res: Response) => {
    try {
        const result = await Services.UpdateTransactionServices(req.params, req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const DeleteTransactionController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.DeleteTransactionServices(req.params);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
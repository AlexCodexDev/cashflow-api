import { Request, Response } from "express";
import * as Services from "./services.js";
import { PaymentBody, PaymentFilter } from "./schema.js";
import { CheckCodeTypes } from "../../types/types.js";

export const GetAllPaymentController = async (req: Request<{}, {}, {}, PaymentFilter>, res: Response) => {
    try {
        const result = await Services.GetAllPaymentServices(req.query);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetPaymentByCodeController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.GetPaymentByCodeServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const CreatePaymentController = async (req: Request<{}, {},  PaymentBody>, res: Response) => {
    try {
        const result = await Services.CreatePaymentServices(req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const UpdatePaymentController = async (req: Request<CheckCodeTypes, {}, PaymentBody>, res: Response) => {
    try {
        const result = await Services.UpdatePaymentServices(req.params, req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const DeletePaymentController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.DeletePaymentServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}
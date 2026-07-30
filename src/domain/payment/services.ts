import { CheckCodeTypes } from "../../types/types.js";
import * as DAO from "./dao.js";
import { PaymentBody, PaymentFilter } from "./schema.js";

export const GetAllPaymentServices = async (filters: PaymentFilter) => {
    const data = await DAO.GetAllPaymentDAO(filters);
    return data;
}

export const GetPaymentByCodeServices = async (code: CheckCodeTypes) => {
    const data = await DAO.GetPaymentByCodeDAO(code);
    return data;
}

export const CreatePaymentServices = async (data: PaymentBody) => {
    await DAO.CreatePaymentDAO(data);
    return ({ message: "Payment successful created." });
}

export const UpdatePaymentServices = async (code: CheckCodeTypes, data: PaymentBody) => {
    await DAO.UpdatePaymentDAO(code, data);
    return ({ message: "Payment successful updated." });
}

export const DeletePaymentServices = async (code: CheckCodeTypes) => {
    await DAO.DeletePaymentDAO(code);
    return ({ message: "Payment successful deleted." });
}
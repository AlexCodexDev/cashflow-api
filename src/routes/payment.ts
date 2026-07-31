import { Router } from "express";
import * as Controller from "../domain/payment/controller.js";
import { Validation } from "../middleware/validation.js";
import { CheckCodeSchema } from "../types/types.js";
import { PaymentFilterSchema, PaymentSchema } from "../domain/payment/schema.js";

const routerPayment: Router = Router();

routerPayment.get("/options", Controller.GetOptionsController);
routerPayment.get("/fetch", Validation(PaymentFilterSchema, "query"), Controller.GetAllPaymentController);
routerPayment.get("/fetch/:code", Validation(CheckCodeSchema, "params"), Controller.GetPaymentByCodeController);

routerPayment.post("/create", Validation(PaymentSchema, "body"), Controller.CreatePaymentController);

routerPayment.put("/update/:code", Validation(CheckCodeSchema, "params"), Validation(PaymentSchema, "body"), Controller.UpdatePaymentController);
routerPayment.put("/delete/:code", Validation(CheckCodeSchema, "params"), Controller.DeletePaymentController);

export default routerPayment;
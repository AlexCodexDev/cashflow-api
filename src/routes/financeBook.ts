import { Router } from "express";
import * as Controller from "../domain/financeBook/controller.js";
import { Validation } from "../middleware/validation.js";
import * as Schema from "../domain/financeBook/schema.js";

const routerFinanceBook: Router = Router();

routerFinanceBook.get("/fetch", Controller.GetAllFinanceBookController);
routerFinanceBook.get("/fetch/:code", Validation(Schema.FinanceBookParamSchema, "params"), Controller.GetFinanceBookByCodeController);
routerFinanceBook.post("/create", Validation(Schema.FinanceBookSchema, "body"), Controller.CreateFinanceBookController);
routerFinanceBook.put("/update/:code", Validation(Schema.FinanceBookParamSchema, "params"), Validation(Schema.FinanceBookSchema, "body"), Controller.UpdateFinanceBookController);

export default routerFinanceBook;
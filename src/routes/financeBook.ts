import { Router } from "express";
import * as Controller from "../domain/financeBook/controller.js";

const routerFinanceBook: Router = Router();

routerFinanceBook.get("/fetch", Controller.GetAllFinanceBookController);

export default routerFinanceBook;
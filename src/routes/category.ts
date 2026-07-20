import { Router } from "express";
import CategoryValidation from "../middleware/category/categoryMiddleware.js";
import * as Controller from "../domain/category/controller.js";
import { CategorySchema } from "../domain/category/schema.js";

const routerCategory: Router = Router();

routerCategory.post("/create", CategoryValidation(CategorySchema), Controller.CreateCatgoryController);

export default routerCategory;
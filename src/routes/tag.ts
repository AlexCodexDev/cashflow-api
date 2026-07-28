import { Router } from "express";
import TagValidation from "../domain/tag/middleware.js";
import * as Controller from "../domain/tag/controller.js";
import * as Schema from "../domain/tag/schema.js";

const routerTag: Router = Router();

routerTag.get("/fetch", Controller.GetTagsController);
routerTag.get("/fetch/:code", Controller.GetTagByCodeController);
routerTag.get("/create", TagValidation(Schema.TagSchema), Controller.GetTagByCodeController);
routerTag.put("/update/:code", TagValidation(Schema.TagSchema), Controller.GetTagByCodeController);
routerTag.put("/delete/:code", Controller.GetTagByCodeController);

export default routerTag;
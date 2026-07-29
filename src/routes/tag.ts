import { Router } from "express";
import TagValidation from "../domain/tag/middleware.js";
import * as Controller from "../domain/tag/controller.js";
import * as Schema from "../domain/tag/schema.js";

const routerTag: Router = Router();

routerTag.get("/fetch", Controller.GetAllTagsController);
routerTag.get("/fetch/:code", Controller.GetTagByCodeController);
routerTag.post("/create", TagValidation(Schema.TagSchema), Controller.CreateTagController);
routerTag.put("/update/:code", TagValidation(Schema.TagSchema), Controller.UpdateTagController);
routerTag.put("/delete/:code", Controller.DeleteTagController);

export default routerTag;
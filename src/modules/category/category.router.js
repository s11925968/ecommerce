import { Router } from "express";
import * as controller from './category.controller.js'
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
const router=Router();

router.post('/',auth(),fileUpload(fileType.image).single('image'),controller.create);
export default router;
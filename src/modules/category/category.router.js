import { Router } from "express";
import * as controller from './category.controller.js'
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
const router=Router();

router.post('/',auth('user'),fileUpload(fileType.image).single('image'),controller.create);
router.get('/',controller.getAll);
router.get('/active',auth(['admin']),controller.getActive);
router.get('/:id',controller.getDetails)
router.patch('/:id',auth('admin'),fileUpload(fileType.image).single('image'),controller.update)
router.delete('/:id',auth('admin'),controller.deleteCategory)

export default router;
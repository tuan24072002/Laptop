import express from 'express';
import {
    addProduct,
    deleteProduct,
    editProduct,
    productById,
    productList
} from '../controllers/product.controller.js';
import { upload } from '../configs/multer.js';
const productRouter = express.Router();
productRouter.get("/list", productList);
productRouter.get("/:id", productById);
productRouter.post("/add", upload.array(["images"]), addProduct);
productRouter.put("/edit/:id", upload.array(["images"]), editProduct);
productRouter.delete("/delete/:id", deleteProduct);
export default productRouter
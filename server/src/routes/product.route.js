import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  productById,
  productList,
} from "../controllers/product.controller.js";
import { upload } from "../configs/multer.js";
import { protectRouteSeller } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();
productRouter.get("/list", productList);
productRouter.get("/:id", productById);
productRouter.post(
  "/add",
  protectRouteSeller,
  upload.array(["images"]),
  addProduct
);
productRouter.put(
  "/edit/:id",
  protectRouteSeller,
  upload.array(["images"]),
  editProduct
);
productRouter.delete("/delete/:id", protectRouteSeller, deleteProduct);
export default productRouter;

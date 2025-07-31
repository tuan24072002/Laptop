import productRouter from './product.route.js';
import userRouter from "./user.route.js";
import express from 'express';

const router = express.Router();

router.use("/products", productRouter);
router.use("/user", userRouter);

export default router
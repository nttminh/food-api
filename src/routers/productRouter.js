import express from "express";
import { createProduct, getProduct } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.get('/get-product', getProduct)
productRouter.get('/create-nguoi-dung', createProduct)


export default productRouter
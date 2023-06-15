import express from 'express';
import likeRouter from './likeRouter.js';
import productRouter from './productRouter.js';
import userRouter from './userRouter.js';

const rootRouter = express.Router();

rootRouter.use("/user", userRouter)
rootRouter.use("/product", productRouter)
rootRouter.use("/like", likeRouter)

export default rootRouter
import express from 'express';
import likeRouter from './likeRouter.js';
import orderRouter from './orderRouter.js';
import rateRouter from './rateRouter.js';

const rootRouter = express.Router();

rootRouter.use("/like", likeRouter)
rootRouter.use("/rate", rateRouter)
rootRouter.use("/order", orderRouter)


export default rootRouter
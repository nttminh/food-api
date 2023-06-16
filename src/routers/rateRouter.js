
import { createRating, getRatesByRestaurant, getRatesByUser } from "../controllers/rateController.js";

import express from 'express';

const rateRouter = express.Router();

rateRouter.post("/", createRating)

rateRouter.get("/res/:res_id", getRatesByRestaurant)
rateRouter.get("/user/:user_id", getRatesByUser)

export default rateRouter;
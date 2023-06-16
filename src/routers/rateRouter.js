
import { createRating, getRatesByRestaurant } from "../controllers/rateController.js";

import express from 'express';

const rateRouter = express.Router();

rateRouter.post("/", createRating)
// likeRouter.delete("/:user_id/:res_id", removeLike)
rateRouter.get("/:res_id", getRatesByRestaurant)
// likeRouter.get("/user/:user_id", getLikesByUser)

export default rateRouter;
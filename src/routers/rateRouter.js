
import { createRating} from "../controllers/rateController.js";

import express from 'express';

const rateRouter = express.Router();

rateRouter.post("/", createRating)
// likeRouter.delete("/:user_id/:res_id", removeLike)
// likeRouter.get("/res/:res_id", getLikesByRestaurant)
// likeRouter.get("/user/:user_id", getLikesByUser)

export default rateRouter;
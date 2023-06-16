
import { getLikesByRestaurants, like, removeLike } from "../controllers/likeController.js";

import express from 'express';

const likeRouter = express.Router();

likeRouter.post("/", like)
likeRouter.delete("/:user_id/:res_id", removeLike)
likeRouter.get("/res/:res_id", getLikesByRestaurants)

export default likeRouter;
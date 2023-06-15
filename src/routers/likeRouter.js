
import { getUserPage, like, removeNguoiDung, updateNguoiDung } from "../controllers/likeController.js";

import express from 'express';

const likeRouter = express.Router();

//userRouter.get("/get-nguoi-dung-by-id/:food_id", getNguoiDungId)
likeRouter.post("/", like)
likeRouter.put("/update-nguoi-dung/:user_id", updateNguoiDung)
likeRouter.delete("/remove-nguoi-dung/:user_id", removeNguoiDung)
likeRouter.get("/get-user-page/:page/:pageSize", getUserPage)

export default likeRouter;

import { createNguoiDung, getNguoiDung, getUserPage, removeNguoiDung, updateNguoiDung } from "../controllers/userController.js";

import express from 'express';

const userRouter = express.Router();


userRouter.get("/get-nguoi-dung", getNguoiDung)
//userRouter.get("/get-nguoi-dung-by-id/:food_id", getNguoiDungId)
userRouter.post("/create-nguoi-dung", createNguoiDung)
userRouter.put("/update-nguoi-dung/:user_id", updateNguoiDung)
userRouter.delete("/remove-nguoi-dung/:user_id", removeNguoiDung)
userRouter.get("/get-user-page/:page/:pageSize", getUserPage)

export default userRouter;
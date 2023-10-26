import express from "express";
import { registerUser, activateUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/activate-user', activateUser);


export default userRouter;
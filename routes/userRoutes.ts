import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/logout-user", logoutUser);

export default userRouter;

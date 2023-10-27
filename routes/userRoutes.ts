import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/logout-user", isAuthenticated, logoutUser);

export default userRouter;

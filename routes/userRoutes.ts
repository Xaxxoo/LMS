import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo
} from "../controllers/userController";
import { isAuthenticated, authorizedRoles } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/logout-user", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user", isAuthenticated, updateUserInfo);



export default userRouter;

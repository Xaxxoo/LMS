import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "./catchAsyncErros";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

// Authenticated User
export const isAuthenticated = catchAsyncError( async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    console.log(req.cookies);
    if (!access_token) {
  
      return next(new ErrorHandler("User is not authenticated", 400));
   
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Invalid Access Token", 403));
    }
    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User Not Found", 403));
    }

    req.user = JSON.parse(user);
    next();
  }
);


// Validate user roles
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) { 

    }
  }
}
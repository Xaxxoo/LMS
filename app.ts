import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

//BodyParser
app.use(express.json({ limit: "50mb" }));

//cookieParser
app.use(cookieParser());

//CORS
app.use(
  cors({
    origin: process.env.ORIGINS,
  })
);

//Testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Test successful",
  });
});

//Unkown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;
  next(err);
});
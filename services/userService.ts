import userModel from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { redis } from "../utils/redis";


//Get User By ID
export const getUserById = async (id: string, res:Response) => {
    const userJson = await redis.get(id);


    if (userJson) {
        const user = JSON.parse(userJson);
    res.status(200).json({
        success: true,
        user
    }); 
    }
  
}
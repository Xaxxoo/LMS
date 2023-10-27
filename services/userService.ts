import userModel from "../models/user.model";
import { NextFunction, Request, Response } from "express";


//Get User By ID
export const getUserById = async (id: string, res:Response) => {
    const user = await userModel.findById(id);
    res.status(200).json({
        success: true,
        user
    });
}
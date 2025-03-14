import dotenv from "dotenv";
import { IRequest } from "../@types/express";
import { NextFunction, Response } from "express";
import { ApiResponse } from "../utils/RequestHandler";
dotenv.config();

export const verifyAdmin = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (req.isAdmin) return next();
    return res.send(new ApiResponse(403, "Forbidden"));
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, "Internal Server Error"));
  }
};

import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { IRequest } from "../@types/express";
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

export const verifySeller = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (req.user && req.user.role === "SELLER") return next();
    return new ApiResponse(403, "Forbidden");
  } catch (error: any) {
    console.warn(error);
    return new ApiResponse(500, "Internal Server Error");
  }
};

export const verifyBuyer = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (req.user && req.user.role === "BUYER") return next();
    return new ApiResponse(403, "Forbidden");
  } catch (error: any) {
    console.warn(error);
    return new ApiResponse(500, "Internal Server Error");
  }
};

export const verifyGovt = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (req.user && req.user.role === "GOVT") return next();
    return new ApiResponse(403, "Forbidden");
  } catch (error: any) {
    console.warn(error);
    return new ApiResponse(500, "Internal Server Error");
  }
};

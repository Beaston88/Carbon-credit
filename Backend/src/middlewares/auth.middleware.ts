import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { firebaseAuth } from "../utils/Firebase-Admin";
import { ApiResponse } from "../utils/RequestHandler";
import prisma from "../prisma/prisma";
import { IRequest } from "../@types/express";

dotenv.config();

export const verifyToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token: string;
    if (process.env.ACCESS_TOKEN_DISABLED === "true") next();
    else {
      const admin = req.headers.admin;
      if (admin && admin === process.env.ADMIN_TOKEN) req.isAdmin = true;

      if (!req.headers.authorization)
        return res.send(new ApiResponse(401, "Unauthorized"));
      token = req.headers.authorization.split(" ")[1];
      req.token = token;
      const user: DecodedIdToken = await firebaseAuth.verifyIdToken(token);
      const userData = await prisma.user.findUnique({
        where: { uid: user.uid },
      });
      if (user) {
        req.user = {
          ...user,
          role: userData?.role || "BUYER",
          id: userData?.id,
        };
        req.token = token;
        next();
      } else return res.send(new ApiResponse(401, "Unauthorised"));
    }
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, "Internal Server Error"));
  }
};

import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { UserRequest } from "../@types/express";
import { firebaseAuth } from "../utils/Firebase-Admin";
import { ApiResponse } from "../utils/RequestHandler";
import prisma from "../prisma/prisma";

dotenv.config();

export const authToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string;
    if (process.env.ACCESS_TOKEN_DISABLED === "true") next();
    else {
      if (!req.headers.authorization)
        return res.send(new ApiResponse(401, "TOKEN_REQUIRED"));
      token = req.headers.authorization.split(" ")[1];
      if (token === process.env.ADMIN_TOKEN) return next();
      const user: DecodedIdToken = await firebaseAuth.verifyIdToken(token);
      const userData = await prisma.user.findUnique({
        where: { uid: user.uid },
      });

      if (user && userData) {
        req.user = { ...user, role: userData.role };
        next();
      } else return res.send(new ApiResponse(401, "INVALID_TOKEN"));
    }
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, "Internal Server Error"));
  }
};

import { IRequest } from "../@types/express";
import { NextFunction, Response } from "express";
import { ApiResponse } from "../utils/RequestHandler";
import prisma from "../prisma/prisma";

export const validateTransaction = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { sender_id, receiver_id, credits } = req.body;

    // Ensure sender and receiver exist
    const sender = await prisma.user.findUnique({
      where: { id: sender_id },
    });
    const receiver = await prisma.user.findUnique({
      where: { id: receiver_id },
    });

    if (!sender || !receiver) {
      return res.send(new ApiResponse(400, "Invalid sender or receiver"));
    }

    // Ensure credits are a valid amount
    if (credits <= 0) {
      return res.send(new ApiResponse(400, "Invalid credit amount"));
    }

    return next();
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, "Internal Server Error"));
  }
};

export const validateCreditListing = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { listingId } = req.params;

    // Check if the credit listing exists and is valid
    const listing = await prisma.transactions.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.send(new ApiResponse(404, "Credit Listing not found"));
    }

    return next();
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, "Internal Server Error"));
  }
};

export const validateImpact = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { userId } = req.body;

    // Ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.send(new ApiResponse(404, "User not found"));
    }

    return next();
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, "Internal Server Error"));
  }
};

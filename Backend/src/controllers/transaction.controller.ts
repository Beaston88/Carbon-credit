import { Response } from "express";
import { IRequest } from "../@types/express";
import { ApiResponse } from "../utils/RequestHandler";
import prisma from "../prisma/prisma";

export async function createTransaction(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return new ApiResponse(401, "Unauthorized");

    const { listingId } = req.body;
    const buyerId = req.user.id;

    // Find the credit listing
    const listing = await prisma.marketplace.findUnique({
      where: { id: listingId },
    });
    if (!listing) return new ApiResponse(404, "Listing not found");

    // Check if the user is a buyer
    if (req.user.role !== "BUYER") {
      return new ApiResponse(403, "Only buyers can create transactions");
    }

    // Create the transaction
    const transaction = await prisma.transactions.create({
      data: {
        sender_id: listing.seller_id,
        receiver_id: buyerId,
        credits: listing.credits,
        status: "ACTIVE",
        validator: "", // To be validated by GOVT
      },
    });

    return new ApiResponse(201, "Transaction Created", transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserTransactions(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return new ApiResponse(401, "Unauthorized");
    const userId = req.user.id;

    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [{ sender_id: userId }, { receiver_id: userId }],
      },
    });

    return new ApiResponse(200, "Transactions Retrieved", transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTransactionById(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;

    const transaction = await prisma.transactions.findUnique({
      where: { id },
    });

    if (!transaction) {
      return new ApiResponse(404, "Transaction Not Found");
    }

    return new ApiResponse(200, "Transaction Retrieved", transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateTransactionStatus(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!req.user) return new ApiResponse(401, "Unauthorized");

    // Ensure the user is admin
    if (req.user.role !== "GOVT") {
      return new ApiResponse(403, "Only GOVT can update transaction status");
    }

    const transaction = await prisma.transactions.update({
      where: { id },
      data: { status },
    });

    return new ApiResponse(200, "Transaction Status Updated", transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

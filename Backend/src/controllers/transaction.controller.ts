import { Response } from "express";
import { IRequest } from "../@types/express";
import { ApiResponse } from "../utils/RequestHandler";
import prisma from "../prisma/prisma";

export async function createTransaction(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));

    const { creditsRequired } = req.body;
    const buyerId = req.user.id;

    if (req.user.role !== "BUYER") {
      return res.send(
        new ApiResponse(403, "Only buyers can create transactions")
      );
    }

    let remainingCredits = creditsRequired;
    let transactions: Awaited<ReturnType<typeof prisma.transactions.create>>[] =
      [];

    // Fetch oldest available listings with transaction history
    const listings = await prisma.marketplace.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "asc" },
      include: {
        transactions: {
          select: {
            credits: true,
          },
        },
      },
    });

    for (const listing of listings) {
      if (remainingCredits <= 0) break;

      // Calculate already purchased credits
      const purchasedCredits = listing.transactions.reduce(
        (sum, txn) => sum + txn.credits,
        0
      );

      // Determine available credits
      const availableCredits = listing.credits - purchasedCredits;
      if (availableCredits <= 0) continue; // Skip sold-out listings

      const creditsToTransfer = Math.min(availableCredits, remainingCredits);

      // Create transaction
      const transaction = await prisma.transactions.create({
        data: {
          sender_id: listing.seller_id,
          receiver_id: buyerId,
          credits: creditsToTransfer,
          status: "ACTIVE",
          validator: "",
          marketplaceId: listing.id,
        },
      });

      transactions.push(transaction);
      remainingCredits -= creditsToTransfer;
    }

    if (remainingCredits > 0) {
      return res.send(new ApiResponse(400, "Not enough credits available"));
    }

    return res.send(
      new ApiResponse(201, "Transaction(s) Created", transactions)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

export async function getUserTransactions(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));
    const userId = req.user.id;

    const transactions = await prisma.transactions.findMany({
      where: { OR: [{ sender_id: userId }, { receiver_id: userId }] },
    });

    return res.send(
      new ApiResponse(200, "Transactions Retrieved", transactions)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

export async function getTransactionById(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));
    const transaction = await prisma.transactions.findUnique({ where: { id } });

    if (!transaction)
      return res.send(new ApiResponse(404, "Transaction Not Found"));

    return res.send(new ApiResponse(200, "Transaction Retrieved", transaction));
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

export async function updateTransactionStatus(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));

    // Ensure the user is admin
    if (req.user.role !== "GOVT")
      return res.send(
        new ApiResponse(403, "Only GOVT can update transaction status")
      );

    const transaction = await prisma.transactions.update({
      where: { id },
      data: { status },
    });

    return res.send(
      new ApiResponse(200, "Transaction Status Updated", transaction)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

import { Response } from "express";
import { IRequest } from "../@types/express";
import prisma from "../prisma/prisma";
import { ApiResponse } from "../utils/RequestHandler";

export async function getDailyImpact(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return res.send(new ApiResponse(403, "Unauthorized"));

    const userId = req.user.id;
    const date = req.query.date as string;

    if (!date) return res.send(new ApiResponse(400, "Date is required"));

    const startDate = new Date(date);
    if (isNaN(startDate.getTime())) {
      return res.send(new ApiResponse(400, "Invalid date format"));
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [{ sender_id: userId }, { receiver_id: userId }],
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const impact = transactions.reduce((acc, transaction) => {
      if (transaction.sender_id === userId) {
        return acc - transaction.credits; // Selling impact
      } else {
        return acc + transaction.credits; // Buying impact
      }
    }, 0);

    return res.send(new ApiResponse(200, "Daily Impact Data", { impact }));
  } catch (error: any) {
    return res.send(new ApiResponse(500, error.message));
  }
}

export async function getTransactionGraph(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return res.send(new ApiResponse(403, "Unauthorized"));

    const userId = req.user.id; // Get authenticated user ID
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.json(
        new ApiResponse(400, "Start date and end date are required")
      );
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.json(new ApiResponse(400, "Invalid date format"));
    }

    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [{ sender_id: userId }, { receiver_id: userId }],
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const graphData = Array(24).fill(0); // Initialize array with 24 hours, each set to 0

    transactions.forEach((transaction) => {
      const hour = new Date(transaction.createdAt).getHours();
      graphData[hour] += transaction.credits;
    });

    return res.json(
      new ApiResponse(200, "Transaction Graph Data", { graphData })
    );
  } catch (error: any) {
    return res.send(new ApiResponse(500, error.message));
  }
}

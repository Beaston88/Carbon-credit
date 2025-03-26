import express from "express";
import { verifyAdmin, verifyBuyer } from "../middlewares/uac.middleware";
import {
  createTransaction,
  getTransactionById,
  getUserTransactions,
  updateTransactionStatus,
} from "../controllers/transaction.controller";
const router = express.Router();

// create a new transaction (buyer purchases credits)
router.post("/", verifyBuyer, createTransaction);

// get all transactions for a user (either sent or received)
router.get("/", getUserTransactions);

// get a specific transaction by ID
router.get("/:id", getTransactionById);

// update the transaction status (e.g., mark as SUCCESS, FAILED)
router.put("/:id", verifyAdmin, updateTransactionStatus);

export default router;

import express from "express";
import {
  getDailyImpact,
  getTransactionGraph,
} from "../controllers/tracking.controller";
const router = express.Router();

// get daily impact data based on credits sold or bought
router.get("/daily-impact", getDailyImpact);

// get transaction graph for a user (transactions per hour)
router.get("/transaction-graph", getTransactionGraph);

export default router;

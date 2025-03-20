import express from "express";
const router = express.Router();

import userRoutes from "./user.route";
import govtRoutes from "./govt.route";
import marketRoutes from "./market.route";
import trackingRoutes from "./tracking.route";
import transactionRoutes from "./transaction.route";
import { verifyToken } from "../middlewares/auth.middleware";

router.use("/user", verifyToken, userRoutes);
router.use("/govt", verifyToken, govtRoutes);
router.use("/market", verifyToken, marketRoutes);
router.use("/tracking", verifyToken, trackingRoutes);
router.use("/transaction", verifyToken, transactionRoutes);

export default router;

import express from "express";
const router = express.Router();

import userRoutes from "./user.routes";
import { verifyToken } from "../middlewares/auth.middleware";

router.use("/user", verifyToken, userRoutes);

export default router;

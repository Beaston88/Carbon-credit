import express from "express";
import {
  authUser,
  deleteUser,
  createUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyAdmin } from "../middlewares/uac.middleware";
const router = express.Router();

// check if the user exists in the database
router.get("/:id", authUser);

// create a new user
router.post("/", createUser);

// update the user details
router.put("/:id", updateUser);

// delete the user from database
router.delete("/:id", verifyAdmin, deleteUser);

export default router;

import express from "express";
import {
  authUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller";
import { verifyAdmin } from "../middlewares/admin.middleware";
const router = express.Router();

// check if the user exists in the database
router.get("/", authUser);

// create user. If user = admin, then create govt user, else create normal user
router.post("/", createUser);

// delete the user using their token, from firebase as well as database
router.delete("/", verifyAdmin, deleteUser);

export default router;

import express from "express";
import { verifySeller } from "../middlewares/uac.middleware";
import {
  createCreditListing,
  deleteCreditListing,
  getAllListings,
  getCreditListingById,
  updateCreditListing,
} from "../controllers/market.controller";
const router = express.Router();

// create a new credit listing by seller
router.post("/marketplace", verifySeller, createCreditListing);

// get all credit listings (only verified or all)
router.get("/marketplace", getAllListings);

// get a specific credit listing by ID
router.get("/marketplace/:id", getCreditListingById);

// update a credit listing (only by seller)
router.put("/marketplace/:id", verifySeller, updateCreditListing);

// delete a credit listing (only by seller)
router.delete("/marketplace/:id", verifySeller, deleteCreditListing);

export default router;

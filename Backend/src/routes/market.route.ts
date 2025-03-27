import express from "express";
import { verifySeller } from "../middlewares/uac.middleware";
import {
  createCreditListing,
  deleteCreditListing,
  getAllListings,
  getCreditListingById,
  getMyListings,
  updateCreditListing,
} from "../controllers/market.controller";
const router = express.Router();

// create a new credit listing by seller
router.post("/", verifySeller, createCreditListing);

// get all credit listings (only verified or all)
router.get("/", getAllListings);

// get a specific credit listing by ID
router.get("/:id", getCreditListingById);

// get all listing of seller
router.get("/me", getMyListings);

// update a credit listing (only by seller)
router.put("/:id", verifySeller, updateCreditListing);

// delete a credit listing (only by seller)
router.delete("/:id", verifySeller, deleteCreditListing);

export default router;

import express from "express";
import { verifyGovt } from "../middlewares/uac.middleware";
import {
  getVerifiedListings,
  verifyCreditListing,
} from "../controllers/govt.controller";
const router = express.Router();

// government verifies a credit listing for a seller
router.post("/verify/:listingId", verifyGovt, verifyCreditListing);

// get all verified credit listings
router.get("/verified-listings", getVerifiedListings);

export default router;

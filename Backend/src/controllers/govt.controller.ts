import { Response } from "express";
import { IRequest } from "../@types/express";
import prisma from "../prisma/prisma";
import { ApiResponse } from "../utils/RequestHandler";

export async function verifyCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { listingId } = req.params;

    const listing = await prisma.marketplace.findUnique({
      where: { id: listingId },
    });
    if (!listing) return res.send(new ApiResponse(404, "Listing not found"));

    // GOVT verifies the listing
    const updatedListing = await prisma.marketplace.update({
      where: { id: listingId },
      data: { verified: true },
    });

    return res.send(
      new ApiResponse(200, "Credit Listing Verified", updatedListing)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

export async function getVerifiedListings(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { isVerified } = req.query;
    if (isVerified === undefined)
      return res.send(
        new ApiResponse(400, "Verified query parameter is required")
      );

    const listings = await prisma.marketplace.findMany({
      where: { verified: isVerified === "true" },
    });
    return res.send(
      new ApiResponse(200, "Verified Listings Retrieved", listings)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

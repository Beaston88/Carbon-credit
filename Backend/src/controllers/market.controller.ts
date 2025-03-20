import { Response } from "express";
import { IRequest } from "../@types/express";
import prisma from "../prisma/prisma";
import { ApiResponse } from "../utils/RequestHandler";

export async function createCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { credits, price } = req.body;
    if (!credits || !price) {
      return new ApiResponse(400, "Credits and price are required");
    }
    if (!req.user) return new ApiResponse(401, "Unauthorized");
    const sellerId = req.user.id;

    // Check if user is a seller
    if (req.user.role !== "SELLER") {
      return new ApiResponse(403, "Only sellers can create listings");
    }

    const listing = await prisma.marketplace.create({
      data: {
        seller_id: sellerId,
        credits,
        price,
      },
    });

    return new ApiResponse(201, "Credit Listing Created", listing);
  } catch (error: any) {
    console.warn(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function getAllListings(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { verified } = req.query;

    const listings = verified
      ? await prisma.marketplace.findMany({ where: { verified: true } })
      : await prisma.marketplace.findMany();

    return new ApiResponse(200, "Credit Listings Retrieved", listings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCreditListingById(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;

    const listing = await prisma.marketplace.findUnique({
      where: { id },
    });

    if (!listing) {
      return new ApiResponse(404, "Credit Listing Not Found");
    }

    return new ApiResponse(200, "Credit Listing Retrieved", listing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    const { credits, price } = req.body;
    if (!req.user) return new ApiResponse(401, "Unauthorized");

    const listing = await prisma.marketplace.findUnique({ where: { id } });
    if (!listing) return new ApiResponse(404, "Listing Not Found");

    // Ensure the user is the seller of the listing
    if (listing.seller_id !== req.user.id) {
      return new ApiResponse(403, "Only the seller can update the listing");
    }

    const updatedListing = await prisma.marketplace.update({
      where: { id },
      data: { credits, price },
    });

    return new ApiResponse(200, "Credit Listing Updated", updatedListing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    if (!req.user) return new ApiResponse(401, "Unauthorized");

    const listing = await prisma.marketplace.findUnique({ where: { id } });
    if (!listing) return new ApiResponse(404, "Listing Not Found");

    // Ensure the user is the seller of the listing
    if (listing.seller_id !== req.user.id) {
      return new ApiResponse(403, "Only the seller can delete the listing");
    }

    await prisma.marketplace.delete({ where: { id } });

    return new ApiResponse(200, "Credit Listing Deleted");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

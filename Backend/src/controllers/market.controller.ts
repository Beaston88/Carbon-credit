import { Response } from "express";
import { IRequest } from "../@types/express";
import prisma from "../prisma/prisma";
import { ApiResponse } from "../utils/RequestHandler";

export async function createCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { credits, price, name, description, image } = req.body;
    if (!credits || !price || !name || !description || !image) {
      return res.send(new ApiResponse(400, "Credits and price are required"));
    }
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));
    const sellerId = req.user.id;

    if (req.user.role !== "SELLER") {
      return res.send(new ApiResponse(403, "Only sellers can create listings"));
    }
    const listing = await prisma.marketplace.create({
      data: {
        seller_id: sellerId,
        credits: parseInt(credits),
        price: parseFloat(price),
        name,
        description,
        image,
      },
    });

    return res.send(new ApiResponse(201, "Credit Listing Created", listing));
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, error.message));
  }
}

export async function getAllListings(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { verified } = req.query;
    if (verified === undefined)
      return res.send(
        new ApiResponse(400, "Verified query parameter is required")
      );
    const listings = await prisma.marketplace.findMany({
      where: { verified: verified === "true" },
    });

    return res.send(
      new ApiResponse(200, "Credit Listings Retrieved", listings)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

export async function getCreditListingById(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    if (!id) return res.send(new ApiResponse(400, "Listing ID is required"));
    if (id == "me") return getMyListings(req, res);
    const listing = await prisma.marketplace.findUnique({ where: { id } });
    if (!listing)
      return res.send(new ApiResponse(404, "Credit Listing Not Found"));
    return res.send(new ApiResponse(200, "Credit Listing Retrieved", listing));
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

// get all listing of buyer or seller
export async function getMyListings(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));
    console.log(req.user.id);
    const listings = await prisma.marketplace.findMany({
      where: { seller_id: req.user.id },
    });

    return res.send(
      new ApiResponse(200, "Credit Listings Retrieved", listings)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

export async function updateCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    if (!id) return res.send(new ApiResponse(400, "Listing ID is required"));

    const { credits, price, name, description, image } = req.body;
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));

    const listing = await prisma.marketplace.findUnique({ where: { id } });
    if (!listing) return res.send(new ApiResponse(404, "Listing Not Found"));

    // Ensure the user is the seller of the listing
    if (listing.seller_id !== req.user.id) {
      return res.send(
        new ApiResponse(403, "Only the seller can update the listing")
      );
    }

    const updatedListing = await prisma.marketplace.update({
      where: { id },
      data: {
        credits: parseInt(credits),
        price: parseFloat(price),
        name,
        description,
        image,
      },
    });

    return res.send(
      new ApiResponse(200, "Credit Listing Updated", updatedListing)
    );
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}
// untested, but will work
export async function deleteCreditListing(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { id } = req.params;
    if (!id) return res.send(new ApiResponse(400, "Listing ID is required"));
    if (!req.user) return res.send(new ApiResponse(401, "Unauthorized"));

    const listing = await prisma.marketplace.findUnique({ where: { id } });
    if (!listing) return res.send(new ApiResponse(404, "Listing Not Found"));

    // Ensure the user is the seller of the listing
    if (listing.seller_id !== req.user.id) {
      return res.send(
        new ApiResponse(403, "Only the seller can delete the listing")
      );
    }

    await prisma.marketplace.delete({ where: { id } });
    return res.send(new ApiResponse(200, "Credit Listing Deleted"));
  } catch (error: any) {
    res.send(new ApiResponse(500, error.message));
  }
}

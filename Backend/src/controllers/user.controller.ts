import { Response } from "express";
import { IRequest } from "../@types/express";
import { firebaseAuth } from "../utils/Firebase-Admin";
import prisma from "../prisma/prisma";
import { ApiResponse } from "../utils/RequestHandler";

export async function authUser(req: IRequest, res: Response): Promise<any> {
  try {
    if (!req.user) return new ApiResponse(401, "User not authenticated");

    const userRecord = await prisma.user.findUnique({
      where: { uid: req.user.uid },
    });
    if (!userRecord) return new ApiResponse(401, "User not found");

    return new ApiResponse(200, "User Authenticated", userRecord);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createUser(req: IRequest, res: Response): Promise<any> {
  try {
    const {
      email,
      password,
      role,
      govt_id,
      gst,
      address,
      phone,
      owner_name,
      wallet_address,
    } = req.body;

    if (req.isAdmin) {
      if (!email || !password || !role || !govt_id || !address || !phone)
        return new ApiResponse(400, "Missing required fields");

      const user = await firebaseAuth.createUser({ email, password });
      await prisma.user.create({
        data: { uid: user.uid, role: "GOVT", govt_id, address, phone },
      });
      return new ApiResponse(200, "User Created");
    } else if (req.user) {
      if (!role || !address || !phone || !owner_name || !wallet_address)
        return new ApiResponse(400, "Missing required fields");
      if (role === "BUYER" || role === "SELLER")
        return new ApiResponse(400, "Invalid role");

      await prisma.user.create({
        data: {
          uid: req.user.uid,
          role,
          gst,
          address,
          phone,
          owner_name,
          wallet_address,
        },
      });
      return new ApiResponse(200, "User Created");
    }
    return new ApiResponse(401, "User not authenticated");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
}

export async function updateUser(req: IRequest, res: Response): Promise<any> {
  try {
    if (!req.user) return new ApiResponse(401, "User not authenticated");
    const { role, govt_id, gst, address, phone, owner_name, wallet_address } =
      req.body;
    if (!role || !address || !phone || !owner_name || !wallet_address)
      return new ApiResponse(400, "Missing required fields");
    if (role === "BUYER" || role === "SELLER")
      return new ApiResponse(400, "Invalid role");

    await prisma.user.update({
      where: { uid: req.user.uid },
      data: { role, govt_id, gst, address, phone, owner_name, wallet_address },
    });
    return res.send(new ApiResponse(200, "User Updated"));
  } catch (error: any) {
    console.warn(error);
    return res.send(new ApiResponse(500, error.message));
  }
}
export async function deleteUser(req: IRequest, res: Response): Promise<any> {
  try {
    if (!req.user) return new ApiResponse(401, "User not authenticated");
    await prisma.user.delete({ where: { uid: req.user.uid } });
    await firebaseAuth.deleteUser(req.user.uid);
    return new ApiResponse(200, "User Deleted");
  } catch (error: any) {
    console.warn(error);
    return new ApiResponse(500, error.message);
  }
}

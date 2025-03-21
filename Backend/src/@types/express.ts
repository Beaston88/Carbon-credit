import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

export interface IRequest extends Request {
  user?: DecodedIdToken & { role?: string };
  isAdmin?: boolean;
  token?: string;
}

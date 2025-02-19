import { NextFunction, Request, Response } from "express";

type RequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) =>
  | Promise<Response<any, Record<string, any>> | undefined>
  | Promise<void>
  | void;

export const asyncHandler =
  (requestHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (err: any) {
      res
        .status(err.code || 500)
        .json({ success: false, message: err.message });

      console.warn(err.message);
    }
  };

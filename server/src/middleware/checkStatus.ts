import { NextFunction, Request, Response } from "express";
export const checkStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hasStatus = req.body.hasOwnProperty("status");
    if (hasStatus) {
      next();
    } else {
      return res.send({});
    }
  } catch (err) {
    console.log(err);
  }
};

import express, { Request, Response } from "express";
import { checkStatus } from "../middleware/checkStatus";

export const ledDataRouter = express.Router();
let status: boolean;

ledDataRouter.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  return res.send({ status: true });
});

ledDataRouter.post("/", (req: Request, res: Response) => {
  const hasStatus = req.body.hasOwnProperty("status");
  if (hasStatus) {
    status = req.body.status;
  }
  return res.send({ status: status });
});

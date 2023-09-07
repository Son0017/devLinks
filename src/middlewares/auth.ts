import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export interface CastumRequest extends Request {
  userId: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY as string);

      (req as CastumRequest).userId = (user as any).userId;
      next();
    } catch (error) {
      return res.status(402).send("Invalid token");
    }
  } else {
    return res.status(402).send("Invalid token");
  }
};

export default auth;

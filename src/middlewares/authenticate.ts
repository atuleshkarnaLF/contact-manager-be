import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthorizedRequest, TokenPayload } from "../domain/user";
import CustomError from "../misc/CustomError";

export const authenticate = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("authenticate");
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    const result = (await jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET as string
    )) as TokenPayload;
    req.authUser = result.userId;
    next();
  } catch (err) {
    next(new CustomError("Invalid access token", 401));
  }
};

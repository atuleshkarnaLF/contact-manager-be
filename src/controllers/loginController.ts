import { NextFunction, Request, Response } from "express";

import * as loginService from "../services/loginService";
import * as tokenService from "../services/tokenService";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  loginService
    .login(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  tokenService
    .getAccessToken(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  loginService
    .createUser({ email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

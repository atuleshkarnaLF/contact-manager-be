import { NextFunction, Request, Response } from "express";

import * as loginService from "../services/loginService";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  loginService
    .createUser({ email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

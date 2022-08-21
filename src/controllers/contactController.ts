import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

import * as contactService from "../services/contactService";

export const getAllContacts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  contactService
    .getAllContacts()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, photograph } = req.body;
  if (!name || !email || !phone || !photograph) {
    throw new CustomError("Missing required fields", StatusCodes.BAD_REQUEST);
  }

  contactService
    .createContact({ name, email, phone, photograph })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;

  contactService
    .deleteContact(+contactId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

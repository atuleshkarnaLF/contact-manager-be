import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";

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

export const getContactById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  contactService
    .getContactById(+contactId)
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

export const updateContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  const { name, email, phone, photograph } = req.body;

  if (!name || !email || !phone || !photograph) {
    logger.error("Missing parameters: id, name, email");
    throw new CustomError(
      "id, name and email all are required",
      StatusCodes.BAD_REQUEST
    );
  }

  contactService
    .updateContact({ name, email, phone, photograph, id: +contactId })
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

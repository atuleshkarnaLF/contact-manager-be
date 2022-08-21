import { StatusCodes } from "http-status-codes";
import Success from "../domain/Success";
import { Contact, CreateContact } from "../domain/User";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import ContactModel from "../models/ContactModel";
import cloudinary from "../utils/cloudinary";

export const getAllContacts = async (): Promise<Success<Contact[]>> => {
  const contactUsers = await ContactModel.getAllContacts();
  return {
    data: contactUsers,
    message: "Users fetched successfully",
  };
};

export const getContactById = async (
  contactId: number
): Promise<Success<Contact>> => {
  logger.info(`Getting users of id ${contactId}`);
  const user = await ContactModel.getContactById(contactId);
  return {
    data: user,
    message: "contact fetched successfully",
  };
};

export const createContact = async (
  payload: CreateContact
): Promise<Success<Contact>> => {
  const { photograph } = payload;
  try {
    logger.info("Uploading image to cloudinary");
    const uploadResponse = await cloudinary.uploader.upload(photograph, {
      upload_preset: "contact-manager",
    });
    logger.info("Successfully uploaded image to cloudinary");
    const { url } = uploadResponse;
    const insertUser = await ContactModel.createContact({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      photograph: url,
    });
    return {
      data: insertUser,
      message: "User contact added successfully",
    };
  } catch (error) {
    throw new CustomError(
      `Error creating a new user contact`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const updateContact = async (
  payload: Contact
): Promise<Success<any>> => {
  logger.info("Updating user");

  const updatedContact = await ContactModel.updateContact(payload);
  return {
    data: updatedContact,
    message: "User updated successfully",
  };
};

export const deleteContact = async (id: number): Promise<Success<Contact>> => {
  logger.info("Deleting user");
  await ContactModel.deleteContact(id);
  return {
    message: "Users deleted successfully",
  };
};

import { StatusCodes } from "http-status-codes";
import db from "../db/db";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";

class Contacts {
  public static table = "contacts";

  public static async getAllContacts() {
    logger.info("Fetching contacts data");
    const users = await db(Contacts.table).select();
    return users;
  }

  public static async getContactById(contactId: number) {
    const user = await db(Contacts.table)
      .where({ id: contactId })
      .select()
      .first();
    return user;
  }

  public static async createContact(contact: any) {
    try {
      logger.info(`Inserting contact ${contact.name} into database`);
      const newUser = await db(Contacts.table)
        .insert({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          photograph: contact.photograph,
        })
        .returning("*");
      logger.info("contact created");
      return newUser;
    } catch (error) {
      throw new CustomError(
        "contact not created",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  public static async updateContact(user: any): Promise<any> {
    logger.info("Updating in table");
    const [updatedUser] = await db(Contacts.table)
      .where({ id: user.id })
      .update({
        name: user.name,
        email: user.email,
        phone: user.phone,
        photograph: user.photograph,
      })
      .returning("*");

    return updatedUser;
  }

  public static async deleteContact(contactId: number): Promise<void> {
    try {
      logger.info("Deleting contact");
      await db(Contacts.table).where({ id: contactId }).delete();
    } catch (error) {
      throw new CustomError(
        "contact cannot be deleted",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
export default Contacts;

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

  public static async createContact(user: any) {
    try {
      logger.info(`Inserting user ${user.name} into database`);
      const newUser = await db(Contacts.table)
        .insert({
          name: user.name,
          email: user.email,
          phone: user.phone,
          photograph: user.photograph,
        })
        .returning("*");
      logger.info("user inserted");
      return newUser;
    } catch (error) {
      throw new CustomError(
        "User contact not created",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
export default Contacts;

import db from "../db/db";

class Users {
  public static table = "users";

  public static async createUser(user: any) {
    const newUser = await db(Users.table).insert(user, ["id", "email"]);
    return newUser;
  }

  public static async getUserByEmail(email: string) {
    const user = await db(Users.table).where({ email: email }).select().first();
    return user;
  }
}
export default Users;

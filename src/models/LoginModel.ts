import db from "../db/db";

class Users {
  public static table = "users";

  public static async createUser(user: any) {
    const newUser = await db(Users.table).insert(user, ["id", "email"]);
    return newUser;
  }
}
export default Users;

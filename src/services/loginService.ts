import Success from "../domain/Success";
import { User, UserToInsert } from "../domain/user";
import bcrypt from "bcrypt";
import LoginModel from "../models/LoginModel";

export const createUser = async (
  userData: UserToInsert
): Promise<Success<User>> => {
  const { password } = userData;

  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, salt);

  const insertedUser = await LoginModel.createUser({
    ...userData,
    password: passwordHash,
  });

  return {
    data: insertedUser,
    message: "Users added successfully",
  };
};

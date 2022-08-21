import Success from "../domain/Success";
import { User, UserToInsert } from "../domain/user";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/common";
import jwt from "jsonwebtoken";
import { Token } from "../domain/Refresh";
import LoginModel from "../models/LoginModel";
import RefreshToken from "../models/RefreshToken";

export const login = async (
  email: string,
  password: string
): Promise<Success<Token>> => {
  const user = await LoginModel.getUserByEmail(email);

  if (!user) {
    return {
      message: "Invalid email or password",
    };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      message: "Invalid email or password",
    };
  }

  const accessToken = createAccessToken({ id: user.id });

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_TOKEN as string
  );

  await RefreshToken.createRefreshToken({
    refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 900000),
  });

  return {
    data: { accessToken, refreshToken },
    message: "Login successful",
  };
};

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

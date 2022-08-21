import logger from "../misc/logger";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken";
import { createAccessToken } from "../utils/common";

export const getAccessToken = async (refreshToken: string) => {
  const existingToken = await RefreshToken.getRefreshToken(refreshToken);

  if (!existingToken) {
    throw new Error("Invalid refresh token");
  }

  if (existingToken.expiresAt < new Date()) {
    throw new Error("Refresh token expired");
  }

  const { userId } = jwt.verify(
    existingToken.refreshToken,
    process.env.JWT_REFRESH_TOKEN as string
  ) as { userId: number };

  logger.info(`Getting access token for refresh token: ${refreshToken}`);
  const accessToken = createAccessToken({ userId });
  return { data: accessToken };
};

export const deleteRefreshToken = async (userId: number) => {
  await RefreshToken.deleteByUserId(userId);
};

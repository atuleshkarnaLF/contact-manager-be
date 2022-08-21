import db from "../db/db";
import { RefreshProps } from "../domain/Refresh";

class RefreshToken {
  private static table = "refresh_token";

  public static async getRefreshToken(
    refreshToken: string
  ): Promise<RefreshProps> {
    const refreshTokens = await db(RefreshToken.table)
      .select()
      .where({ refreshToken })
      .first();

    return refreshTokens;
  }

  public static async createRefreshToken(
    refreshToken: RefreshProps
  ): Promise<any> {
    const newRefreshToken = await db(RefreshToken.table).insert(refreshToken, [
      "refresh_token",
      "user_id",
      "expires_at",
    ]);

    return newRefreshToken;
  }

  public static async deleteByUserId(userId: number): Promise<void> {
    await db(RefreshToken.table).where({ userId }).delete();
  }
}

export default RefreshToken;

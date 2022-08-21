export interface RefreshProps {
  refreshToken: string;
  userId: number;
  expiresAt: Date;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

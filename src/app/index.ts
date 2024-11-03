export interface IContentData {
  id: number;
  title: string;
  publishedDate: string;
  summary: string;
  imageUrl: string;
  categories: string[];
  providerId: number;
  providerTitle: string;
  providerUrl: string;
  providerIconUrl: string;
}
export interface ITokenData {
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenIssuedAt: string;
  accessTokenExpiresAt: string;
  refreshTokenIssuedAt: string;
  refreshTokenExpiresAt: string;
}

export interface IGroup {
  name: string;
}

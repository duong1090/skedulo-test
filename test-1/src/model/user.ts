export interface User {
  avatar: string;
  username: string;
  type: string;
  score: number;
}

export interface UserApiResponse {
  avatar_url: string;
  login: string;
  type: string;
  score: number;
}

export const mapUser = (responseData: UserApiResponse, extra: any): User => ({
  avatar: responseData.avatar_url,
  username: responseData.login,
  type: responseData.type,
  ...extra,
});

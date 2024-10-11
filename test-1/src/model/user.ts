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

export const mapUser = (responseData: UserApiResponse): User => ({
  avatar: responseData.avatar_url,
  username: responseData.login,
  type: responseData.type,
  score: responseData.score,
});

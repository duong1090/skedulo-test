import axios from "axios";
import { UserApiResponse } from "model";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getGithubUsers = ({ perPage }: { perPage: number }) =>
  axios.get<UserApiResponse[]>("/users", {
    params: { per_page: perPage },
  });

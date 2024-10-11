import axios from "axios";
import { UserApiResponse } from "model";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const searchUsersApi = ({
  perPage,
  query,
}: {
  perPage: number;
  query: string;
}) =>
  axios.get<{ items: UserApiResponse[] }>("/search/users", {
    params: { per_page: perPage, q: query },
  });

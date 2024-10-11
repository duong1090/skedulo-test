import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGithubUsers } from "api";
import { mapUser, User } from "model";
import { RootState } from "states/store";

export interface UsersState {
  data: User[];
  fetching: boolean;
}

const initialState: UsersState = {
  data: [],
  fetching: false,
};

// async thunk --------------------------------------------------------------------------------------------------------
export const getUsersAsync = createAsyncThunk<
  User[],
  { perPage: number; searchTerm: string },
  { state: RootState }
>("users/getMany", async (arg, thunkApi) => {
  try {
    const response = await getGithubUsers({
      perPage: arg.perPage,
    });

    // delay for smoother loading animation
    await delay(1000);

    return response.data?.map((i) =>
      mapUser(i, { score: calculateScore(arg.searchTerm, i.login) }),
    );
  } catch (e) {
    return Promise.reject(e);
  }
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const calculateScore = (searchTerm: string, username: string): number => {
  if (!searchTerm || !username) {
    return 0; // Return 0 if either is empty
  }

  // Convert both to lower case for case insensitive comparison
  const lowerSearchTerm = searchTerm.toLowerCase();
  const lowerUsername = username.toLowerCase();

  // Check for exact match
  if (lowerUsername === lowerSearchTerm) {
    return 1.0; // Exact match score
  }

  // Calculate partial match score
  const score = lowerUsername.includes(lowerSearchTerm)
    ? lowerSearchTerm.length / lowerUsername.length
    : 0;

  return parseFloat(score.toFixed(2));
};

// slice --------------------------------------------------------------------------------------------------------
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.fetching = false;
      state.data = action.payload;
    });
    builder.addCase(getUsersAsync.rejected, (state) => {
      state.fetching = false;
      state.data = [];
    });
  },
});

// selector --------------------------------------------------------------------------------------------------------
export const getUsersSelector = (state: RootState) => state.users;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsersApi } from "api";
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
    const response = await searchUsersApi({
      perPage: arg.perPage,
      query: arg.searchTerm,
    });

    // delay for smoother loading animation
    await delay(1000);

    return response.data?.items?.map(mapUser);
  } catch (e) {
    return Promise.reject(e);
  }
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

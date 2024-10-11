import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

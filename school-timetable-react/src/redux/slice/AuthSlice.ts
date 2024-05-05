import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: false,
  reducers: {
    setAuthResult: (state: boolean) => {
      return state;
    },
  },
});

export const { setAuthResult } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer;

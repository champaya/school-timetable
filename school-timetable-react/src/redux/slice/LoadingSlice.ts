import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    startLoading: () => {
      return true;
    },
    finishLoading: () => {
      return false;
    },
  },
});

export const { startLoading, finishLoading } = LoadingSlice.actions;

export const loadingReducer = LoadingSlice.reducer;

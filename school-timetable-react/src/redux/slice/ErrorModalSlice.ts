import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorModalSlice {
  open: boolean;
  message: string;
}

const ErrorModalSlice = createSlice({
  name: "errorModal",
  initialState: { open: false, message: "" },
  reducers: {
    openErrorModal: (state: ErrorModalSlice, action: PayloadAction<string>) => {
      return { ...state, ...{ open: true, message: action.payload } };
    },
    closeErrorModal: (
      state: ErrorModalSlice,
      action: PayloadAction<string>
    ) => {
      return { ...state, ...{ open: false, message: action.payload } };
    },
  },
});

export const { openErrorModal, closeErrorModal } = ErrorModalSlice.actions;

export const errorModalReducer = ErrorModalSlice.reducer;

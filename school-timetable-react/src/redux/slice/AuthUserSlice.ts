import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthUser {
  user_id: number;
  auth: boolean;
}

const AuthUserSlice = createSlice({
  name: "AuthUser",
  initialState: { user_id: -1, auth: false },
  reducers: {
    setAuthUser: (state: AuthUser, action: PayloadAction<AuthUser>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAuthUser } = AuthUserSlice.actions;

export const AuthUserReducer = AuthUserSlice.reducer;

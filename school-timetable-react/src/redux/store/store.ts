import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { loadingReducer } from "../slice/LoadingSlice";
import { AuthReducer } from "../slice/AuthSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: AuthReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const wrappedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

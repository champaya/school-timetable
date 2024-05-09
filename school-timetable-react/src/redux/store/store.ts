import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { loadingReducer } from "../slice/LoadingSlice";
import { AuthUserReducer } from "../slice/AuthUserSlice";
import { FilterLectureReducer } from "../slice/FilterLectureSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    authUser: AuthUserReducer,
    filterLecture: FilterLectureReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const wrappedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

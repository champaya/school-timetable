import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { loadingReducer } from "../slice/LoadingSlice";
import { FilterLectureReducer } from "../slice/FilterLectureSlice";
import { errorModalReducer } from "../slice/ErrorModalSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    filterLecture: FilterLectureReducer,
    errorModal: errorModalReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const wrappedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

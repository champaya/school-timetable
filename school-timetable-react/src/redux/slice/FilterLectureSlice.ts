import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FilterCondition {
  lecture_id: number;
  day_of_week: number;
  time: number;
  period: number;
}

const FilterLectureSlice = createSlice({
  name: "FilterLecture",
  initialState: { lecture_id: -1, day_of_week: -1, time: -1, period: -1 },
  reducers: {
    setFilterCondition: (
      state: FilterCondition,
      action: PayloadAction<FilterCondition>
    ) => {
      return { ...state, ...action.payload };
    },
    resetFilterCondition: () => {
      return { lecture_id: -1, day_of_week: -1, time: -1, period: -1 };
    },
  },
});

export const { setFilterCondition, resetFilterCondition } =
  FilterLectureSlice.actions;

export const FilterLectureReducer = FilterLectureSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CONSTANT } from "../../consts/constant";

export interface FilterCondition {
  lecture_id: number;
  day_of_week: number;
  time: number;
  period: number;
}

const FilterLectureSlice = createSlice({
  name: "FilterLecture",
  initialState: {
    lecture_id: CONSTANT.LECTURE_ID.ALL.value,
    day_of_week: CONSTANT.DAY_OF_WEEk.ALL.value,
    time: CONSTANT.TIME.ALL.value,
    period: CONSTANT.PERIOD.ALL.value,
  },
  reducers: {
    setFilterCondition: (
      state: FilterCondition,
      action: PayloadAction<FilterCondition>
    ) => {
      return { ...state, ...action.payload };
    },
    resetFilterCondition: () => {
      return {
        lecture_id: CONSTANT.LECTURE_ID.ALL.value,
        day_of_week: CONSTANT.DAY_OF_WEEk.ALL.value,
        time: CONSTANT.TIME.ALL.value,
        period: CONSTANT.PERIOD.ALL.value,
      };
    },
  },
});

export const { setFilterCondition, resetFilterCondition } =
  FilterLectureSlice.actions;

export const FilterLectureReducer = FilterLectureSlice.reducer;

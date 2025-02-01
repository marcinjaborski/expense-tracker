import { DateTime } from "luxon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DashboardType = {
  startDate: DateTime;
  endDate: DateTime;
};

const initialState: DashboardType = {
  startDate: DateTime.now().minus({ month: 5 }).startOf("month"),
  endDate: DateTime.now().endOf("month"),
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setStartDate: (state, { payload }: PayloadAction<DateTime>) => {
      state.startDate = payload;
    },
    setEndDate: (state, { payload }: PayloadAction<DateTime>) => {
      state.endDate = payload;
    },
  },
});

export const { setStartDate, setEndDate } = dashboardSlice.actions;
export const { reducer: dashboardReducer } = dashboardSlice;

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { expenseFilterReducer } from "@src/store/ExpenseFilterSlice.ts";
import { dialogsReducer } from "@src/store/DialogSlice.ts";
import { feedbackReducer } from "@src/store/FeedbackSlice.ts";
import { dashboardReducer } from "@src/store/DashboardSlice.ts";

const store = configureStore({
  reducer: {
    expenseFilter: expenseFilterReducer,
    dialog: dialogsReducer,
    feedback: feedbackReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

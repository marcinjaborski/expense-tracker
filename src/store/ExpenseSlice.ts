import { ExpenseReturnType } from "@src/repository/useExpenses.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tables } from "@src/utils/database.types.ts";

export type ExpenseState = {
  expenseToEdit: ExpenseReturnType | null;
  expenseDeleteId: number | null;
  plannedExpenseToEdit: Tables<"planned_expenses"> | null;
};

const initialState: ExpenseState = {
  expenseToEdit: null,
  expenseDeleteId: null,
  plannedExpenseToEdit: null,
};

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    setExpenseToEdit: (state, { payload }: PayloadAction<ExpenseReturnType | null>) => {
      // @ts-expect-error probably caused by using enum in tables, works fine
      state.expenseToEdit = payload;
    },
    setExpenseDeleteId: (state, { payload }: PayloadAction<number | null>) => {
      state.expenseDeleteId = payload;
    },
    setPlannedExpenseToEdit: (state, { payload }: PayloadAction<Tables<"planned_expenses"> | null>) => {
      state.plannedExpenseToEdit = payload;
    },
  },
});

export const { setExpenseToEdit, setExpenseDeleteId, setPlannedExpenseToEdit } = expenseSlice.actions;
export const { reducer: expenseReducer } = expenseSlice;

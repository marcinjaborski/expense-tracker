import { ExpenseReturnType } from "@src/repository/useExpenses.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExpenseState = {
  expenseToEdit: ExpenseReturnType | null;
  expenseDeleteId: number | null;
};

const initialState: ExpenseState = {
  expenseToEdit: null,
  expenseDeleteId: null,
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
  },
});

export const { setExpenseToEdit, setExpenseDeleteId } = expenseSlice.actions;
export const { reducer: expenseReducer } = expenseSlice;

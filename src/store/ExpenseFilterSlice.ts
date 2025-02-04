import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dir, Sort } from "@src/utils/types.ts";

export type ExpenseFilterState = {
  open: boolean;
  q: string;
  accounts: number[];
  categories: number[];
  sort: Sort;
  dir: Dir;
};

const initialState: ExpenseFilterState = {
  open: false,
  q: "",
  accounts: [],
  categories: [],
  sort: "date",
  dir: "desc",
};

const expenseFilterSlice = createSlice({
  name: "expenseFilterSlice",
  initialState,
  reducers: {
    openDialog(state) {
      state.open = true;
    },
    closeDialog(state) {
      state.open = false;
    },
    setQ(state, { payload }: PayloadAction<string>) {
      state.q = payload;
    },
    setCategories(state, { payload }: PayloadAction<number[]>) {
      state.categories = payload;
    },
    setAccounts(state, { payload }: PayloadAction<number[]>) {
      state.accounts = payload;
    },
    setSort(state, { payload }: PayloadAction<Sort>) {
      state.sort = payload;
    },
    toggleDir(state) {
      state.dir = state.dir === "asc" ? "desc" : "asc";
    },
  },
});

export const { openDialog, closeDialog, setQ, setCategories, setAccounts, setSort, toggleDir } =
  expenseFilterSlice.actions;
export const { reducer: expenseFilterReducer } = expenseFilterSlice;

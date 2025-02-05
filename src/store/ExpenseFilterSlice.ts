import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dir, Sort } from "@src/utils/types.ts";

export type ExpenseFilterState = {
  open: boolean;
  q: string;
  accounts: number[];
  categories: number[];
  sort: Sort;
  dir: Dir;
  dateFrom: string;
  dateTo: string;
  amountFrom: number;
  amountTo: number;
};

const initialState: ExpenseFilterState = {
  open: false,
  q: "",
  accounts: [],
  categories: [],
  sort: "date",
  dir: "desc",
  dateFrom: "",
  dateTo: "",
  amountFrom: 0,
  amountTo: 0,
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
    setDateFrom(state, { payload }: PayloadAction<string>) {
      state.dateFrom = payload;
    },
    setDateTo(state, { payload }: PayloadAction<string>) {
      state.dateTo = payload;
    },
    setAmountFrom(state, { payload }: PayloadAction<number>) {
      state.amountFrom = payload;
    },
    setAmountTo(state, { payload }: PayloadAction<number>) {
      state.amountTo = payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  openDialog,
  closeDialog,
  setQ,
  setCategories,
  setAccounts,
  setSort,
  toggleDir,
  setDateFrom,
  setDateTo,
  setAmountFrom,
  setAmountTo,
  resetFilters,
} = expenseFilterSlice.actions;
export const { reducer: expenseFilterReducer } = expenseFilterSlice;

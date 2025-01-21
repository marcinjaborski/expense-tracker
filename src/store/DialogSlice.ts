import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogState = {
  accountDialogOpen: boolean;
  categoryDialogOpen: boolean;
  debtDialogOpen: boolean;
};

const initialState: DialogState = {
  accountDialogOpen: false,
  categoryDialogOpen: false,
  debtDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialogsSlice",
  initialState,
  reducers: {
    setAccountDialogOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.accountDialogOpen = payload;
    },
    setCategoryDialogOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.categoryDialogOpen = payload;
    },
    setDebtDialogOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.debtDialogOpen = payload;
    },
  },
});

export const { setAccountDialogOpen, setCategoryDialogOpen, setDebtDialogOpen } = dialogSlice.actions;
export const { reducer: dialogsReducer } = dialogSlice;

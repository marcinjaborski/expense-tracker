import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogState = {
  accountDialogOpen: boolean;
  categoryDialogOpen: boolean;
};

const initialState: DialogState = {
  accountDialogOpen: false,
  categoryDialogOpen: false,
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
  },
});

export const { setAccountDialogOpen, setCategoryDialogOpen } = dialogSlice.actions;
export const { reducer: dialogsReducer } = dialogSlice;

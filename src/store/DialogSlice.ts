import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogState = {
  accountDialogOpen: boolean;
};

const initialState: DialogState = {
  accountDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialogsSlice",
  initialState,
  reducers: {
    setAccountDialogOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.accountDialogOpen = payload;
    },
  },
});

export const { setAccountDialogOpen } = dialogSlice.actions;
export const { reducer: dialogsReducer } = dialogSlice;

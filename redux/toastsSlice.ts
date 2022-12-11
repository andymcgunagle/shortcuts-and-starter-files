import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id?: number;
  message: string;
  type?: 'danger' | 'success' | 'warning';
};

export interface ToastsState {
  toasts: Toast[];
};

const initialState: ToastsState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    setToasts(state, { payload }: PayloadAction<ToastsState['toasts']>) {
      state.toasts = payload;
    },
  },
});

export const {
  setToasts,
} = toastsSlice.actions;

export const toastsReducer = toastsSlice.reducer;

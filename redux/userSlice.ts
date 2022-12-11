import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  displayName: SelectUserValues["displayName"],
  email: SelectUserValues["email"],
  emailVerified: SelectUserValues["emailVerified"],
  isLoading: boolean,
  photoURL: SelectUserValues["photoURL"] | null,
  uid: SelectUserValues["uid"] | null,
};

const initialState: UserState = {
  displayName: null,
  email: null,
  emailVerified: false,
  isLoading: true,
  photoURL: null,
  uid: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserSlice() {
      return initialState;
    },
    setIsLoading(state, { payload }: PayloadAction<UserState['isLoading']>) {
      state.isLoading = payload;
    },
    setUser(state, { payload }: PayloadAction<SelectUserValues | null>) {
      if (!payload) return;
      state.displayName = payload.displayName;
      state.email = payload.email;
      state.emailVerified = payload.emailVerified;
      state.uid = payload.uid;
    },
  },
});

export const {
  resetUserSlice,
  setIsLoading,
  setUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

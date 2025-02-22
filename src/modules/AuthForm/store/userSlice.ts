import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  data: userData | null;
  token: string;
};

type userData = {
  avatar_url: string;
  login: string;
  name: string;
};

const initialState: UserState = {
  data: null,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userData>) => {
      state.data = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
      state.token = "";
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;

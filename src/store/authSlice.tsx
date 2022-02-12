import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "src/types/user";

const defaultValue: IUser = {
  id: 0,
  email: "",
  password: "",
  name: "",
  token: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: defaultValue,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.token;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    resetAuth: (state) => {
      state = defaultValue;
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;

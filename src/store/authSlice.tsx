import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "src/types/user";

const defaultValue: IUser = {
  id: 0,
  userid: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  contact: "",
  brokerid: "",
  office: "",
  token: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: defaultValue,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.userid = action.payload.userid;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.password = "";
      state.contact = action.payload.contact;
      state.brokerid = action.payload.brokerid;
      state.office = action.payload.office;
      state.token = action.payload.token;
    },
    resetAuth: (state) => {
      state = defaultValue;
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;

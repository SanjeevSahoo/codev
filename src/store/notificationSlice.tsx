import { createSlice } from "@reduxjs/toolkit";
import IAlertPropsValue from "src/types/AlertPropsValue";

const initialState: IAlertPropsValue = {
  status: false,
  severity: "success",
  message: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showNotification: (state, action) => {
      state.status = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideNotification: (state) => {
      state.status = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

import { useAppSelector } from "src/store/hooks";
import useNotification from "../hooks/useNotification";
import { shallowEqual } from "react-redux";
import React from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertNotification: React.FC = () => {
  const notification = useNotification();
  const notificationState = useAppSelector(
    ({ notification }) => ({ ...notification }),
    shallowEqual
  );
  const msgCloseHandler = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    notification.hide();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={notificationState.status}
      autoHideDuration={6000}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        notification.hide();
      }}
    >
      <Alert
        onClose={msgCloseHandler}
        severity={notificationState.severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {notificationState.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;

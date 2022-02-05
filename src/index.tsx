import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "./App";
import "./i18n/config";
import "./index.css";
import theme from "./theme";
import ErrorBoundary from "./components/ErrorBoundary";
import { Provider } from "react-redux";
import store from "src/store";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary screen="Application">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

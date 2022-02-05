import { Home } from "@mui/icons-material";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoutes from "./components/PrivateRoutes";
import { configureFakeBackend } from "./utils/fake-backend";
import SignIn from "./views/authentication/SignIn";
import SignUp from "./views/authentication/SignUp";

configureFakeBackend();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path={"/home"}
            element={
              <ErrorBoundary screen="Page">
                <Home />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route
          path="/signin"
          element={
            <ErrorBoundary screen="Page">
              <SignIn />
            </ErrorBoundary>
          }
        />
        <Route
          path="/signup"
          element={
            <ErrorBoundary screen="Page">
              <SignUp />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

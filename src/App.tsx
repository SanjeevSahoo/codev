import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import AlertNotification from "./components/layout/AlertNotification";
import PrivateRoutes from "./components/PrivateRoutes";
import { configureFakeBackend } from "./utils/fake-backend";
import AuthHome from "./views/authentication/AuthHome";
const ContactUs = React.lazy(() => import("./views/authentication/ContactUs"));
const ForgotPassword = React.lazy(
  () => import("./views/authentication/ForgotPassword")
);
const Help = React.lazy(() => import("./views/authentication/Help"));
const SignIn = React.lazy(() => import("./views/authentication/SignIn"));
const SignUp = React.lazy(() => import("./views/authentication/SignUp"));
const Home = React.lazy(() => import("./views/masterapp/Home"));

configureFakeBackend();

function App() {
  return (
    <BrowserRouter>
      <AlertNotification />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route index element={<Navigate to="home" />} />
          <Route
            path={"home"}
            element={
              <ErrorBoundary screen="Page">
                <Home />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route
          path="auth-home"
          element={
            <ErrorBoundary screen="Page">
              <AuthHome />
            </ErrorBoundary>
          }
        >
          <Route index element={<Navigate to="signin" />} />
          <Route
            path="signin"
            element={
              <ErrorBoundary screen="Page">
                <SignIn />
              </ErrorBoundary>
            }
          />
          <Route
            path="signup"
            element={
              <ErrorBoundary screen="Page">
                <SignUp />
              </ErrorBoundary>
            }
          />
          <Route
            path="forgotpassword"
            element={
              <ErrorBoundary screen="Page">
                <ForgotPassword />
              </ErrorBoundary>
            }
          />
          <Route
            path="contactus"
            element={
              <ErrorBoundary screen="Page">
                <ContactUs />
              </ErrorBoundary>
            }
          />
          <Route
            path="help"
            element={
              <ErrorBoundary screen="Page">
                <Help />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

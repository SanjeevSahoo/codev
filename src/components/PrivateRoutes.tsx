import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;

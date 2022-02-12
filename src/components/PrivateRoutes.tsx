import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

const PrivateRoutes = () => {
  const authState = useAppSelector((state) => state.auth);
  let isAuthenticated = false;
  if (authState.token !== "") {
    isAuthenticated = true;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth-home" />;
};

export default PrivateRoutes;

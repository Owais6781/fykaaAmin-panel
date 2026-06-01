import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLogin } from "../../utils/auth";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isLogin()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
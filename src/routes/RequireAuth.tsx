import { Navigate, useLocation } from "react-router-dom";

import Cookies from "universal-cookie";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const cookies = new Cookies();
  const token = cookies.get("access_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  } else if (location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

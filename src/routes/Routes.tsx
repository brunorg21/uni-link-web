import { Navigate, createBrowserRouter } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

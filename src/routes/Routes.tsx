import { Navigate, createBrowserRouter } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Rooms from "../pages/Rooms";
import Teachers from "../pages/Teachers";

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
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
    ],
  },
]);

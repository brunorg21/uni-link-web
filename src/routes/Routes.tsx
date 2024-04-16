import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AppContainer from "../components/AppContainer";
import { createRoot } from "react-dom/client";
import { PropsWithChildren } from "react";

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
    children: [{ path: "/home", element: <Home /> }],
  },
]);

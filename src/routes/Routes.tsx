import { createBrowserRouter } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Rooms from "../pages/Rooms";
import Teachers from "../pages/Teachers";
import Subjects from "../pages/Subjects";
import { RequireAuth } from "./RequireAuth";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppContainer />
      </RequireAuth>
    ),
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
      {
        path: "/subjects",
        element: <Subjects />,
      },
    ],
  },
]);

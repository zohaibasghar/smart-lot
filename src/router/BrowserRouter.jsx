import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AccountSetting from "../pages/Settings/AccountSetting";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "account",
        element: <AccountSetting />,
        // loader: teamLoader,
      },
    ],
  },
]);

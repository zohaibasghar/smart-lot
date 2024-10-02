import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AccountSetting from "../pages/Settings/AccountSetting";
import Vehicles from "../pages/vehicles/Vehicles";
import AddCar from "../pages/vehicles/AddCar";
import Users from "../pages/users/Users";
import AddUser from "../pages/users/AddUser";
import Locations from "../pages/locations/Locations";
import AddLocation from "../pages/locations/AddLocation";
import Companies from "../pages/companies/Companies";
import AddCompany from "../pages/companies/AddCompany";
import Lots from "../pages/lots/Lots";
import AddLot from "../pages/lots/AddLot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "account",
        element: <AccountSetting />,
      },
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      { path: "add-vehicle", element: <AddCar /> },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "locations",
        element: <Locations />,
      },
      {
        path: "add-location",
        element: <AddLocation />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "add-company",
        element: <AddCompany />,
      },
      {
        path: "lots",
        element: <Lots />,
      },
      {
        path: "add-lot",
        element: <AddLot />,
      },
    ],
  },
]);

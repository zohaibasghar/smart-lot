import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

function MainLayout() {
  return (
    <div>
      <TopBar />
      <div className="flex-row flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;

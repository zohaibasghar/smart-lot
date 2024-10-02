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
        <div className="bg-[#929292] rounded-tl-[32px] w-full min-h-[90vh] p-4">
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

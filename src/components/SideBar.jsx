import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { FaBuildingColumns, FaSquareParking } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import { LiaClock } from "react-icons/lia";
import { MdOutlinePhone } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { RiPoliceCarLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const path = useLocation();
  return (
    <div className="pt-12 pl-7 w-[200px]">
      <div className="text-white">
        <h2 className="pb-2  text-base font-extrabold">Main Menu</h2>
        <div className="flex flex-col gap-4">
          <Link to={"/"} className="menu-item">
            <FaHome />
            <p className={`${path.pathname === "/" && "font-bold"}`}>Home</p>
          </Link>
          <Link to={"/vehicles"} className="menu-item">
            <RiPoliceCarLine />
            <p className={`${path.pathname === "/vehicles" && "font-bold"}`}>
              Vehicles
            </p>
          </Link>
          <Link to={"/users"} className="menu-item">
            <FaRegUserCircle />
            <p className={`${path.pathname === "/users" && "font-bold"}`}>
              Users
            </p>
          </Link>
          <Link to={"/companies"} className="menu-item">
            <FaBuildingColumns />
            <p className={`${path.pathname === "/companies" && "font-bold"}`}>
              Companies
            </p>
          </Link>
          <Link to={"/locations"} className="menu-item">
            <PiMapPinFill />
            <p className={`${path.pathname === "/locations" && "font-bold"}`}>
              Locations
            </p>
          </Link>
          <Link to={"/lots"} className="menu-item">
            <FaSquareParking />
            <p className={`${path.pathname === "/lots" && "font-bold"}`}>
              Parking Lots
            </p>
          </Link>
          <Link to={"/account"} className="menu-item">
            <BsInfoCircleFill />
            <p className={`${path.pathname === "/account" && "font-bold"}`}>
              Account
            </p>
          </Link>
        </div>
      </div>
      <div className="text-white">
        <h2 className="mt-12 mb-2 text-base font-extrabold">Support</h2>
        <div className="flex flex-col gap-4">
          <Link to={"/"} className="menu-item">
            <MdOutlinePhone />
            <p>Contact Us</p>
          </Link>
          <Link to={"/"} className="menu-item">
            <LiaClock />
            <p>Submit Ticket</p>
          </Link>
          <Link to={"/"} className="menu-item">
            <IoMdCard />
            <p>Billing</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

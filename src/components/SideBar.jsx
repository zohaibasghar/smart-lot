import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { IoMdCard } from "react-icons/io";
import { LiaClock } from "react-icons/lia";
import { MdOutlinePhone } from "react-icons/md";
import { RiPoliceCarLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="pt-12 pl-7 w-[200px]">
      <div className="text-white">
        <h2 className="pb-2  text-base font-extrabold">Main Menu</h2>
        <div className="flex flex-col gap-4">
          <Link to={"/"} className="menu-item">
            <FaHome />
            <p>Home</p>
          </Link>
          <Link to={"/"} className="menu-item">
            <RiPoliceCarLine />
            <p>Vehicles</p>
          </Link>
          <Link to={"/"} className="menu-item">
            <FaRegUserCircle />
            <p>Users</p>
          </Link>
          <Link to={"/account"} className="menu-item">
            <BsInfoCircleFill />
            <p>Account</p>
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

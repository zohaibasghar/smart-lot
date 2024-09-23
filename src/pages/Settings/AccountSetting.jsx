import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function AccountSetting() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="rounded-tl-[32px] bg-[#929292] w-[100%] p-5 h-[100%]">
      <h2 className="text-2xl font-extrabold text-white">Account Settings</h2>
      <div className="flex flex-row ">
        <div className="w-[200px] border-r border-[#d3cccc] h-[100%] flex items-center py-8 mt-6 flex-col  mr-8">
          <div className="flex flex-col gap-6">
            <Link
              className={`menu-item text-white font-semibold rounded-full px-4 py-2 ${
                activeSection === 0 && "bg-[#FF3A3E]"
              }`}
              onClick={() => setActiveSection(0)}
            >
              My profile
            </Link>
            <Link
              className={`menu-item text-white font-semibold rounded-full px-4 py-2 ${
                activeSection === 1 && "bg-[#FF3A3E] "
              }`}
              onClick={() => setActiveSection(1)}
            >
              Billing
            </Link>
            <Link
              className={`menu-item text-white font-semibold rounded-full px-4 py-2 ${
                activeSection === 2 && "bg-[#FF3A3E] "
              }`}
              onClick={() => setActiveSection(2)}
            >
              Users
            </Link>
          </div>
          <div>
            <button className="flex gap-2 items-center rounded-full px-3 py-2 text-[#B10707] bg-white mt-[40vh]">
              <IoIosLogOut color="#B10707" /> Logout
            </button>
          </div>
        </div>
        <div className="py-7 w-[100%]">
          <h2 className="text-xl font-extrabold text-white mb-7">My Profile</h2>
          <div className="section">
            <div className="flex justify-between items-center">
              <h2>Dealership Information</h2>
              <button className="bg-white flex items-center section-button">
                Edit
                <RiEditFill />
              </button>
            </div>
            <div className="flex ">
              <div className="section-info">
                <p className="heading">Dealership</p>
                <p className="title">Toyota Westbury</p>
              </div>
              <div className="section-info">
                <p className="heading">Dealership</p>
                <p className="title">Toyota Westbury</p>
              </div>
            </div>
            <div className="flex ">
              <div className="section-info">
                <p className="heading">Primary Contact</p>
                <p className="title">Duncan Smith</p>
              </div>
              <div className="section-info">
                <p className="heading">Role</p>
                <p className="title">General Manager</p>
              </div>
            </div>
            <div className="flex ">
              <div className="section-info">
                <p className="heading">Phone</p>
                <p className="title">+1 123-456-789</p>
              </div>
              <div className="section-info">
                <p className="heading">Status</p>
                <p className="title">Active</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="flex justify-between items-center">
              <h2>Email address</h2>
              <button className="bg-white flex items-center section-button">
                Edit
                <RiEditFill />
              </button>
            </div>
            <div className="section-info">
              <p className="heading">Email Address</p>
              <p className="title">Dsmith@toyotawestbury.com</p>
            </div>
          </div>
          <div className="section">
            <div className="flex justify-between items-center">
              <h2>Password</h2>
              <button className="bg-white flex items-center section-button">
                Edit
                <RiEditFill />
              </button>
            </div>
            <div className="section-info">
              <p className="heading">Password</p>
              <div className="flex gap-8 items-center">
                <p className="title">************</p>
                <p className="heading font-[14px]">No Password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;

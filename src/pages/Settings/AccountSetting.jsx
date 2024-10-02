import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { apiInstance } from "../../api/api";
import { toast } from "react-toastify";

function AccountSetting() {
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [mainLoading, setMainLoading] = useState(true);
  const [editDealership, setEditDealership] = useState(false);
  const [dealershipLoading, setDealershipLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, SeteditPassword] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passwords, setPasswords] = useState({ oldPass: "", newPass: "" });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user).id;
    apiInstance
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data.data);
        setOriginalUser(res.data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setMainLoading(false));

    return () => setUser(null);
  }, []);

  function handleDealershipChange(key, value) {
    setUser({
      ...user,
      [key]: value,
    });
  }
  function handleSaveDealership() {
    setDealershipLoading(true);
    apiInstance
      .put(`/users/${user?.id}`, user)
      .then((res) => {
        setUser(res.data.data);
        setEditDealership(false);
      })
      .catch((error) => {
        console.error(error);
        setUser(originalUser);
      })
      .finally(() => setDealershipLoading(false));
  }
  function handleSaveEmail() {
    setEmailLoading(true);
    apiInstance
      .put(`/users/${user?.id}`, {
        email: user?.email,
      })
      .then((res) => {
        setUser(res.data.data);
        setEditEmail(false);
      })
      .catch((error) => {
        console.error(error);
        setUser(originalUser);
      })
      .finally(() => setEmailLoading(false));
  }
  function handlePasswordChange() {
    setPassLoading(true);
    apiInstance
      .put(`/users/change-password/${user?.id}`, passwords)
      .then((res) => {
        toast.success(res.data.message);

        SeteditPassword(false);
      })
      .catch((error) => {
        console.error(error);
        setUser(originalUser);
      })
      .finally(() => setPassLoading(false));
  }

  if (mainLoading) {
    return (
      <div className="bg-[#929292] min-h-[90vh] w-full rounded-tl-[32px]">
        <div className="text-center mx-auto pt-40">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="">
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
              {editDealership ? (
                <div className="flex gap-4">
                  <button
                    className="bg-white section-button"
                    onClick={handleSaveDealership}
                    disabled={dealershipLoading}
                  >
                    {dealershipLoading ? "Loading..." : "Save"}
                  </button>
                  <button
                    className="border border-white bg-transparent text-white section-button"
                    onClick={() => setEditDealership(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-white flex items-center section-button"
                  onClick={() => setEditDealership(true)}
                >
                  Edit
                  <RiEditFill />
                </button>
              )}
            </div>
            <div className="flex ">
              <div className="section-info">
                <p className="heading">Dealership</p>
                {editDealership ? (
                  <input
                    type="text"
                    value={user?.dealership}
                    onChange={(e) =>
                      handleDealershipChange("dealership", e.target.value)
                    }
                    className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                  />
                ) : (
                  <p className="title">{user?.dealership}</p>
                )}
              </div>
              <div className="section-info">
                <p className="heading">Location</p>
                <p className="title">{user?.location?.name}</p>
              </div>
            </div>
            <div className="flex ">
              <div className="section-info">
                <p className="heading">Primary Contact</p>
                {editDealership ? (
                  <input
                    type="text"
                    value={user?.contactName}
                    onChange={(e) =>
                      handleDealershipChange("contactName", e.target.value)
                    }
                    className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                  />
                ) : (
                  <p className="title">{user?.contactName}</p>
                )}
              </div>
              <div className="section-info">
                <p className="heading">Role</p>
                {editDealership ? (
                  <input
                    type="text"
                    value={user?.role}
                    onChange={(e) =>
                      handleDealershipChange("role", e.target.value)
                    }
                    className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                  />
                ) : (
                  <p className="title">{user?.role}</p>
                )}
              </div>
            </div>
            <div className="flex ">
              <div className="section-info">
                <p className="heading">Phone</p>
                {editDealership ? (
                  <input
                    type="text"
                    value={user?.phone}
                    onChange={(e) =>
                      handleDealershipChange("phone", e.target.value)
                    }
                    className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                  />
                ) : (
                  <p className="title">{user?.phone}</p>
                )}
              </div>
              <div className="section-info">
                <p className="heading">Status</p>
                <p className="title">{user?.status}</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="flex justify-between items-center">
              <h2>Email address</h2>
              {editEmail ? (
                <div className="flex gap-4">
                  <button
                    className="bg-white section-button"
                    onClick={handleSaveEmail}
                    disabled={emailLoading}
                  >
                    {emailLoading ? "Loading..." : "Save"}
                  </button>
                  <button
                    className="border border-white bg-transparent text-white section-button"
                    onClick={() => setEditEmail(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-white flex items-center section-button"
                  onClick={() => setEditEmail(true)}
                >
                  Edit
                  <RiEditFill />
                </button>
              )}
            </div>
            <div className="section-info">
              <p className="heading">Email Address</p>
              {editEmail ? (
                <input
                  type="text"
                  value={user?.email}
                  onChange={(e) =>
                    handleDealershipChange("email", e.target.value)
                  }
                  className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                />
              ) : (
                <p className="title">{user?.email}</p>
              )}
            </div>
          </div>
          <div className="section">
            <div className="flex justify-between items-center">
              <h2>Password</h2>
              {editPassword ? (
                <div className="flex gap-4">
                  <button
                    className="bg-white section-button"
                    onClick={handlePasswordChange}
                    disabled={passLoading}
                  >
                    {passLoading ? "Loading..." : "Save"}
                  </button>
                  <button
                    className="border border-white bg-transparent text-white section-button"
                    onClick={() => SeteditPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-white flex items-center section-button"
                  onClick={() => SeteditPassword(true)}
                >
                  Edit
                  <RiEditFill />
                </button>
              )}
            </div>
            <div className="section-info">
              <p className="heading">Password</p>
              <div className="flex gap-8 items-center">
                {editPassword ? (
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter current password"
                      value={passwords.oldPass}
                      onChange={(e) =>
                        setPasswords({ ...passwords, oldPass: e.target.value })
                      }
                      className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                    />
                    <input
                      type="text"
                      placeholder="Enter new password"
                      value={passwords.newPass}
                      onChange={(e) =>
                        setPasswords({ ...passwords, newPass: e.target.value })
                      }
                      className="bg-[#161616] text-white border rounded-lg px-2 py-1"
                    />
                  </div>
                ) : (
                  <p className="title">************</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;

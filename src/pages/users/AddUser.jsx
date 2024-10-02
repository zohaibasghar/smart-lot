import React, { useEffect, useState } from "react";
import { apiInstance } from "../../api/api";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    userType: "user",
    locationId: "",
    companyId: "",
    contactName: "",
    dealership: "",
    role: "",
    status: "active",
    password: "12345678",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  function getCompanies() {
    apiInstance
      .get("/companies")
      .then((res) => setCompanies(res.data.data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    Promise.all([getCompanies()]);
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    apiInstance
      .post("/users/create", user)
      .then(() => {
        navigate("/users");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  function handleUserChange(key, value) {
    setUser({ ...user, [key]: value });
  }

  return (
    <div>
      <div className="text-white font-bold text-2xl">Add User</div>
      <div className="pt-4">
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="+1 234-443-543"
                required
                value={user.phone}
                onChange={(e) => handleUserChange("phone", e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company
              </label>
              <select
                id="company"
                className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
                value={user.companyId}
                onChange={(e) => handleUserChange("companyId", e.target.value)}
                required
              >
                <option value="">Select company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                for="contactName"
                className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
                placeholder="John Doe"
                value={user.contactName}
                onChange={(e) =>
                  handleUserChange("contactName", e.target.value)
                }
              />
            </div>
            <div>
              <label
                for="dealership"
                className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Dealership
              </label>
              <input
                type="text"
                id="dealership"
                className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
                placeholder="dealership"
                value={user.dealership}
                onChange={(e) => handleUserChange("dealership", e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="General Manager"
              required
              value={user.role}
              onChange={(e) => handleUserChange("role", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="john.doe@company.com"
              required
              value={user.email}
              onChange={(e) => handleUserChange("email", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;

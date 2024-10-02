import React, { useState } from "react";
import { apiInstance } from "../../api/api";
import { useNavigate } from "react-router-dom";

function AddCompany() {
  const [company, setCompany] = useState({
    name: "",
    hashKey: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    apiInstance
      .post("/companies", company)
      .then(() => {
        navigate("/companies");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  function handleCompanyChange(key, value) {
    setCompany({ ...company, [key]: value });
  }

  return (
    <div>
      <div className="text-white font-bold text-2xl">Add Company</div>
      <div className="pt-4 md:max-w-[50%]">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="Toyota Westbury"
              required
              value={company.name}
              onChange={(e) => handleCompanyChange("name", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="hashKey"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Hash Key
            </label>
            <input
              type="text"
              id="hashKey"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="toyota_westbury_1"
              step={"any"}
              required
              value={company.hashKey}
              onChange={(e) =>
                handleCompanyChange("hashKey", e.target.value)
              }
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

export default AddCompany;

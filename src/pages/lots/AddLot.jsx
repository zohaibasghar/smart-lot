import React, { useEffect, useState } from "react";
import { apiInstance } from "../../api/api";
import { useNavigate } from "react-router-dom";

function AddLot() {
  const [lot, setLot] = useState({
    companyId: "",
    spaces: null,
    width: null,
    height: null,
  });
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

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
      .post("/lots", lot)
      .then(() => {
        navigate("/lots");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  function handleLotChange(key, value) {
    setLot({ ...lot, [key]: value });
  }

  return (
    <div>
      <div className="text-white font-bold text-2xl">Add Lot</div>
      <div className="pt-4 md:max-w-[50%]">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company
            </label>
            <select
              id="company"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              value={lot.companyId}
              onChange={(e) => handleLotChange("companyId", e.target.value)}
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
          <div className="mb-6">
            <label
              for="spaces"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Spaces
            </label>
            <input
              type="number"
              id="spaces"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="24"
              required
              value={lot.spaces}
              onChange={(e) => handleLotChange("spaces", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="height"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Height
            </label>
            <input
              type="number"
              id="height"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="24.3 in feet"
              step={"any"}
              required
              value={lot.height}
              onChange={(e) => handleLotChange("height", Number(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label
              for="width"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Width
            </label>
            <input
              type="number"
              id="width"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="24.5 in feet"
              step={"any"}
              required
              value={lot.width}
              onChange={(e) => handleLotChange("width", Number(e.target.value))}
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

export default AddLot;

import React, { useState } from "react";
import { apiInstance } from "../../api/api";
import { useNavigate } from "react-router-dom";

function AddLocation() {
  const [location, setLocation] = useState({
    name: "",
    lat: null,
    lng: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    apiInstance
      .post("/locations/create", location)
      .then(() => {
        navigate("/locations");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  function handleLocationChange(key, value) {
    setLocation({ ...location, [key]: value });
  }

  return (
    <div>
      <div className="text-white font-bold text-2xl">Add Location</div>
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
              placeholder="Westbury, NY"
              required
              value={location.name}
              onChange={(e) => handleLocationChange("name", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="latitude"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="40.75893"
              step={"any"}
              required
              value={location.lat}
              onChange={(e) =>
                handleLocationChange("lat", Number(e.target.value))
              }
            />
          </div>
          <div className="mb-6">
            <label
              for="longitude"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              className="bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="-73.588173"
              required
              step={"any"}
              value={location.lng}
              onChange={(e) =>
                handleLocationChange("lng", Number(e.target.value))
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

export default AddLocation;

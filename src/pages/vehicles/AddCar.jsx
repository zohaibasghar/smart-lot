import React, { useEffect, useRef, useState } from "react";
import { apiInstance } from "../../api/api";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddCar() {
  const [carDetails, setCarDetails] = useState({
    companyId: "",
    vin: "",
    ticketNumber: "",
    make: "",
    model: "",
    year: 2024,
    licensePlate: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const ref = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  function getUsers() {
    apiInstance
      .get("/users")
      .then((res) => setUsers(res.data.data))
      .catch((error) => console.error(error));
  }
  function getCompanies() {
    apiInstance
      .get("/companies")
      .then((res) => setCompanies(res.data.data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    Promise.all([getUsers(), getCompanies()]);
  }, []);

  function handleCarSubmit(e) {
    e.preventDefault();
    // setLoading(true);
    const formData = new FormData();
    Object.entries(carDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((image) => {
      formData.append("images", image);
    });

    apiInstance
      .post("/cars/uploadcar", formData)
      .then((res) => {
        setCarDetails(res.data.data);
        navigate("/vehicles");
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  function handleDetailChange(key, value) {
    setCarDetails({ ...carDetails, [key]: value });
  }

  return (
    <div className="">
      <h2 className="font-semibold text-2xl text-white">Add vehicle</h2>
      <div className="flex flex-wrap-reverse justify-between">
        <form onSubmit={handleCarSubmit} className="p-4">
          <div className="grid gap-6 mb-6 grid-cols-2 xl:grid-cols-3">
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
                value={carDetails.companyId}
                onChange={(e) =>
                  handleDetailChange("companyId", e.target.value)
                }
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
                for="vin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                VIN
              </label>
              <input
                type="text"
                id="vin"
                className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
                placeholder="UA123"
                value={carDetails.vin}
                onChange={(e) => handleDetailChange("vin", e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="ticket_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ticket Number
              </label>
              <input
                type="text"
                id="ticket_number"
                className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
                placeholder="CA5124"
                value={carDetails.ticketNumber}
                required
                onChange={(e) =>
                  handleDetailChange("ticketNumber", e.target.value)
                }
              />
            </div>
            <div>
              <label
                for="make"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Make
              </label>
              <input
                type="text"
                id="make"
                className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
                placeholder="Toyota"
                value={carDetails.make}
                onChange={(e) => handleDetailChange("make", e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="model"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
                placeholder="Corolla"
                value={carDetails.model}
                onChange={(e) => handleDetailChange("model", e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
                placeholder="2024"
                value={carDetails.year}
                onChange={(e) => handleDetailChange("year", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="license_plate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              License Plate
            </label>
            <input
              type="text"
              id="license_plate"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="AR-52-532"
              value={carDetails.licensePlate}
              onChange={(e) =>
                handleDetailChange("licensePlate", e.target.value)
              }
              required
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="user"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User
            </label>
            <select
              id="user"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              value={carDetails.userId}
              onChange={(e) => handleDetailChange("userId", e.target.value)}
              required
            >
              <option value="">Select user</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email} - {user.contactName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </form>
        <div className="md:max-w-[40%] md:min-w-[20%] w-full md:w-full">
          <input
            type="file"
            className="hidden"
            id="file"
            multiple
            accept="image/*"
            ref={ref}
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);

              const existingFiles = new Set(images.map((file) => file.name));

              const newFiles = selectedFiles.filter(
                (file) => !existingFiles.has(file.name)
              );

              setImages((prevImages) => [...prevImages, ...newFiles]);
            }}
          />
          {images.length ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img) => {
                const url = URL.createObjectURL(img);
                return (
                  <img
                    key={url}
                    src={url}
                    alt={url}
                    className="h-40 w-40 object-contain rounded"
                  />
                );
              })}
              <button
                className="justify-center items-center flex flex-col h-40 w-40 bg-slate-500 rounded-lg gap-2 cursor-pointer"
                onClick={() => {
                  ref.current?.click();
                }}
              >
                <FaPlus size={32} />
                <div className="font-semibold">Add car images</div>
              </button>
            </div>
          ) : (
            <button
              className="justify-center text-white items-center flex flex-col w-full md:w-[50%] m-auto bg-slate-500 h-40 my-4 md:mt-20 rounded-lg gap-2 cursor-pointer"
              onClick={() => {
                ref.current?.click();
              }}
            >
              <FaPlus size={32} />
              <div className="font-semibold">Add car images</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCar;

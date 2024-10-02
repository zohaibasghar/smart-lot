import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiInstance } from "../../api/api";

function Vehicles() {
  const [searchValue, setSearchValue] = useState({
    vin: "",
    make: "",
    model: "",
    year: "",
    ticketNumber: "",
    licensePlate: "",
  });
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);
      apiInstance
        .get(
          `/cars/search?vin=${searchValue.vin}&make=${searchValue.make}&model=${searchValue.model}&year=${searchValue.year}&ticketNumber=${searchValue.ticketNumber}&licensePlate=${searchValue.licensePlate}`
        )
        .then((res) => setVehicles(res.data.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, 800);

    return () => {
      clearTimeout(handler);
      setVehicles([]);
    };
  }, [searchValue]);

  function handleSearchChange(key, value) {
    setSearchValue({ ...searchValue, [key]: value });
  }

  return (
    <div className="">
      <div className="flex justify-between  mb-5">
        <div className="flex gap-2 flex-wrap w-[90%]">
          <div>
            <input
              type="text"
              id="vin"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="VIN"
              value={searchValue.vin}
              onChange={(e) => handleSearchChange("vin", e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="ticket_number"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="Ticket Number"
              value={searchValue.ticketNumber}
              required
              onChange={(e) =>
                handleSearchChange("ticketNumber", e.target.value)
              }
            />
          </div>
          <div>
            <input
              type="text"
              id="make"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="Make"
              value={searchValue.make}
              onChange={(e) => handleSearchChange("make", e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="model"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="Model"
              value={searchValue.model}
              onChange={(e) => handleSearchChange("model", e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              id="year"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="Year"
              value={searchValue.year}
              onChange={(e) => handleSearchChange("year", e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="licensePlate"
              className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5"
              placeholder="License Plate"
              value={searchValue.licensePlate}
              onChange={(e) =>
                handleSearchChange("licensePlate", e.target.value)
              }
              required
            />
          </div>
        </div>
        <div>
          <button
            className="py-2 px-4 rounded-lg text-white font-semibold whitespace-nowrap"
            onClick={() => navigate("/add-vehicle")}
          >
            Add car
          </button>
        </div>
      </div>
      {loading ? (
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
      ) : (
        <div>
          {vehicles.length ? (
            vehicles.map((vehicle) => {
              return (
                <div
                  key={vehicle.id}
                  className="grid lg:grid-cols-2 grid-cols-1 border rounded-lg p-4 mb-4 bg-black"
                >
                  <div className="md:p-4 md:pr-8">
                    <img
                      src="https://idsb.tmgrup.com.tr/ly/uploads/images/2021/05/30/118050.jpg"
                      alt="toyota"
                      className=""
                    />
                  </div>
                  <div className=" grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                      <p className="heading">VIN</p>
                      <p className="title">{vehicle.vin}</p>
                    </div>
                    <div>
                      <p className="heading">Ticket Number</p>
                      <p className="title">{vehicle.ticketNumber}</p>
                    </div>
                    <div>
                      <p className="heading">Make</p>
                      <p className="title">{vehicle.make}</p>
                    </div>
                    <div>
                      <p className="heading">Model</p>
                      <p className="title">{vehicle.model}</p>
                    </div>
                    <div>
                      <p className="heading">Year</p>
                      <p className="title">{vehicle.year}</p>
                    </div>
                    <div>
                      <p className="heading">License Plate</p>
                      <p className="title">{vehicle.licensePlate}</p>
                    </div>
                    <div>
                      <p className="heading">Car State</p>
                      <p className="title">{vehicle.carState}</p>
                    </div>
                    <div>
                      <p className="heading">Company</p>
                      <p className="title">{vehicle.company.name}</p>
                    </div>
                    <div>
                      <p className="heading">User Email</p>
                      <p className="title">{vehicle.user.email}</p>
                    </div>
                    <div>
                      <p className="heading">User Contact name</p>
                      <p className="title">{vehicle.user.contactName}</p>
                    </div>
                    <div>
                      <p className="heading">User Contact</p>
                      <p className="title">{vehicle.user.phone}</p>
                    </div>
                    <div>
                      <p className="heading">User Role</p>
                      <p className="title">{vehicle.user.role}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Vehicles not found!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Vehicles;

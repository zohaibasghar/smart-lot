import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../../api/api";
import { FaTrash } from "react-icons/fa";

function Comapnies() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCompanies() {
    apiInstance
      .get("/companies")
      .then((res) => setCompanies(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    getCompanies();

    return () => setCompanies([]);
  }, []);

  const filtered = useMemo(
    () =>
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, companies]
  );

  function handleCompanyDelete(id) {
    setLoading(true);
    apiInstance
      .delete(`/companies/${id}`)
      .then(() => getCompanies())
      .catch((err) => console.log(err));
  }
  return (
    <div className="">
      <div className="flex justify-between gap-4 flex-wrap">
        <input
          type="text"
          id="location"
          className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg w-full p-2.5 max-w-[50%]"
          placeholder="Search company"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        <button
          className="py-2 px-4 rounded-lg text-white font-semibold whitespace-nowrap"
          onClick={() => navigate("/add-company")}
        >
          Add company
        </button>
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
        <div className="py-4">
          {filtered.length ? (
            filtered.map((company) => {
              return (
                <div
                  key={company.id}
                  className="bg-black mb-4 text-white p-4 rounded-lg flex justify-between items-center"
                >
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div>
                      <p className="heading">Name</p>
                      <p className="title">{company.name}</p>
                    </div>
                    <div>
                      <p className="heading">Hash Key</p>
                      <p className="title">{company.hashKey}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleCompanyDelete(company?.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center mt-10 text-white">
              No companies found!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Comapnies;

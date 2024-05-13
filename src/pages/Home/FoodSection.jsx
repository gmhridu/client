import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useMediaQuery } from "react-responsive";

const FoodFilter = () => {
  const [count, setCount] = useState(0);
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });
  const isExtraLargeScreen = useMediaQuery({ minWidth: 1280 });

  let itemsPerPage = 4;

  if (isSmallScreen) {
    itemsPerPage = 2;
  } else if (isMediumScreen) {
    itemsPerPage = 2;
  } else if (isLargeScreen) {
    itemsPerPage = 3;
  } else if (isExtraLargeScreen) {
    itemsPerPage = 8;
  }

  // Calculate the number of pages
  const numberOfPages = Math.ceil(count / itemsPerPage);

  // Generate array of page numbers
  const pages = [...Array(numberOfPages).keys()].map((ele) => ele + 1);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(
          `${
            import.meta.env.VITE_API_URL
          }/foods/food-filter?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
        );
        setFoods(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [currentPage, filter, sort, itemsPerPage, search]);

  useEffect(() => {
    const getCount = async () => {
      try {
        const { data } = await axios(
          `${
            import.meta.env.VITE_API_URL
          }/foods/food-count?filter=${filter}&search=${search}`
        );
        setCount(data?.count);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };
    getCount();
  }, [filter, search]);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };
  return (
    <div>
      <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
            <div class="md:max-w-sm mx-auto w-full">
              <select
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                value={filter}
                name="foodStatus"
                id="foodStatus"
                className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  Filter by Status
                </option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            <form
              className="md:max-w-md mx-auto w-full"
              onSubmit={handleSearch}
            >
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  name="search"
                  placeholder="Enter Food Name"
                  aria-label="Enter Food Name"
                  className="block w-full px-10 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-[4px] bottom-[5px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="md:max-w-sm mx-auto w-full">
              <select
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                value={sort}
                name="sort"
                id="sort"
                className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  Sort By Expiry Date
                </option>
                <option value="dsc">Descending Order</option>
                <option value="asc">Ascending Order</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-[10%] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {foods?.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 font-sans font-bold">
          {/* previous button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            title="previous"
            type="button"
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              type="button"
              title={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-blue-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          {/* Next button */}
          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            title="next"
            type="button"
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodFilter;

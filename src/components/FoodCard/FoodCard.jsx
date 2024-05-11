import React from "react";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
 const {
  _id,
    foodImage,
    foodName,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    additionalNotes,
    donator: { name, image },
 } = food;
  return (
    <div className="h-full">
      <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
        <div className="h-[250px]">
          <img
            className="rounded-t-lg object-cover h-full w-full"
            src={foodImage}
            alt={foodName}
          />
        </div>
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {foodName}
            </h5>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              {additionalNotes}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[#4f4545] dark:text-gray-400 text-lg">
                <span className="text-base font-semibold text-black">
                  Pickup Location:
                </span>{" "}
                {pickupLocation}
              </p>
              <p className="text-[#4f4545] dark:text-gray-400 text-lg">
                <span className="text-base font-semibold text-black">
                  Quantity:
                </span>{" "}
                {foodQuantity}
              </p>
              <p className="text-[#4f4545] dark:text-gray-400 text-lg">
                <span className="text-base font-semibold text-black">
                  Expired Date:
                </span>{" "}
                {new Date(expiredDateTime).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center gap-2">
                <p className="text-[#4f4545] dark:text-gray-400 text-lg">
                  <span className="text-base font-semibold text-black">
                    Donator:
                  </span>{" "}
                  {name}
                </p>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div title={name} className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt="User Profile Photo"
                      src={image}
                    />
                  </div>
                </div>
              </div>
            </div>
       <Link
        to={`/food/${_id}`}
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg mt-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Details
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

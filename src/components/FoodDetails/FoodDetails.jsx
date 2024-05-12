import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLoaderData } from "react-router-dom";

const FoodDetails = () => {
  const foods = useLoaderData();

  const {
    foodImage,
    foodName,
    foodQuantity,
    createdAt,
    pickupLocation,
    expiredDateTime,
    additionalNotes,
    donator: { name, image},
  } = foods || {};


  return (
    <div className="flex items-center justify-center my-10 px-6">
      <div className="w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="h-96">
          <img
            className="object-cover w-full h-full"
            src={foodImage}
            alt={foodName}
          />
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <span className="text-lg font-semibold text-blue-600 uppercase dark:text-blue-400">
              {foodName}
            </span>
            <p className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
              {additionalNotes}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Dramatically unleash focused partnerships before cross-unit
              interfaces. Intrinsically create orthogonal platforms vis-a-vis
              world-class functionalities. Distinctively emasculated synergistic
              potentialities through enterprise opportunities. Collaboratively.
            </p>

            <p className="text-lg">
              <span className="font-semibold">Quantity:</span> {foodQuantity}
            </p>
            <p className="text-lg font-mono">
              <span className="font-merriWeather font-semibold">
                Expired Date:
              </span>{" "}
              {new Date(expiredDateTime).toLocaleDateString()}
            </p>
            <p className="text-lg font-medium font-sans">
              <span className="font-semibold font-merriWeather">
                Pickup Location:
              </span>{" "}
              {pickupLocation}
            </p>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <img
                  className="object-cover h-10 rounded-full"
                  src={image}
                  alt="Avatar"
                />
                <h3 className="mx-2 font-semibold text-gray-700 dark:text-gray-200">
                  {name}
                </h3>
              </div>
              <span className="mx-1 text-lg font-mono text-gray-600 dark:text-gray-300 pl-14">
                <span className="font-merriWeather font-semibold">
                  Posted At:
                </span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <Link
                to={"/my-request"}
                type="submit"
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Request Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;

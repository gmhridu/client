import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyRequest = () => {
  const { user } = useAuth();

  const getMyFood = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/requests?email=${user?.email}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching my food requests:", error);
      return [];
    }
  };

  const { data: myReq = [], isLoading } = useQuery({
    queryKey: ["myReq", user?.email],
    queryFn: getMyFood,
    enabled: !!user?.email,
  });

  console.log(myReq);

  return (
    <div className="my-10 min-h-[calc(100vh-320px)]">
      <div className="relative overflow-x-auto px-2 md:px-6 sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Donator Email
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Expired Date
              </th>
              <th scope="col" className="px-6 py-3">
                Pickup Location
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myReq.length > 0 ? (
              myReq.map((food) => (
                <tr
                  key={food.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="btn btn-ghost btn-circle avatar">
                      <img
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full hover:ring-4"
                        src={food?.foodImage}
                        alt={food?.foodName}
                      />
                    </div>
                  </th>
                  <td className="px-6 py-4">{food?.foodName}</td>
                  <td className="px-6 py-4">{food?.donatorEmail}</td>
                  <td className="px-6 py-4">{food?.foodQuantity}</td>
                  <td className="px-6 py-4">
                    {new Date(food?.expiredDateTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{food?.pickupLocation}</td>
                  <td className="flex items-center px-6 py-4">
                    <Link
                      to={`/edit-request/${food.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      onClick={() => handleRemoveRequest(food.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td
                  colSpan="7"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  You haven't added any requested food yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequest;

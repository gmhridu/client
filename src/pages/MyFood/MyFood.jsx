import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../shared/Loader/Loader";
import Error from "../Error/Error";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import toast from "react-hot-toast";

const deleteFood = async (foodId) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}/foods/${foodId}`
  );
  return data;
}


const MyFood = () => {
  const { user } = useAuth();
   const [selectedFoodId, setSelectedFoodId] = useState(null);


  const queryClient = useQueryClient()

  const getMyFood = async () => {
     if (!user) return;

     const userEmail = user?.email;

     const { data } = await axios.get(
       `${import.meta.env.VITE_API_URL}/foods/my-food/${userEmail}`
    );
    return data;
  };
  const { data: myFoods = [],
    isLoading,
    isError,
   } = useQuery({
    queryKey: "myFoods",
     queryFn: getMyFood,
    enabled: !!user,
   })
  
  const deleteFoodMutation = useMutation({
    mutationFn: async (foodId) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/foods/${foodId}`
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Food deleted successfully");
      queryClient.invalidateQueries(["myFoods"]);
      setSelectedFoodId(null);
    },
    onError: () => {
      console.error("Failed to delete food item");
      toast.error("Failed to delete food item");
    },
  });
  
  const handleDelete = (foodId) => {
    setSelectedFoodId(foodId);
    document.getElementById("my_modal_3").showModal();
 }

  const handleConfirmDelete = () => {
    deleteFoodMutation.mutate(selectedFoodId);
  };

  
  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="my-10">
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
                Email
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
            {myFoods?.length === 0 ? (
              <div className="my-6 min-h-[calc(100vh-300px)]">
                <tr className="flex items-center justify-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td
                    colSpan="7"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    You Don't have added any food yet! To Add Food{" "}
                    <span className="hover:text-blue-400 underline">
                      <Link to={"/add-food"}>Click Here</Link>
                    </span>
                  </td>
                </tr>
              </div>
            ) : (
              myFoods?.map((food) => (
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
                  <td className="px-6 py-4">{food?.donator?.email}</td>
                  <td className="px-6 py-4">{food?.foodQuantity}</td>
                  <td className="px-6 py-4">
                    {new Date(food?.expiredDateTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{food?.pickupLocation}</td>
                  <td className="flex items-center px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <div>
                      <button
                        onClick={()=> handleDelete(food._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </button>
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
                              Are you sure you want to delete this food?
                            </h1>
                            <div className="flex">
                              <form method="dialog">
                                <button
                                  onClick={handleConfirmDelete}
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center btn">
                                  Yes, I'm sure
                                </button>
                              </form>
                              <form method="dialog">
                                <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 btn">
                                  No, cancel
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFood;

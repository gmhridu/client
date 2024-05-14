import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader/Loader";
import Error from "../Error/Error";

const MyFood = () => {
  const { user } = useAuth();
  const [selectedFood, setSelectedFood] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    foodQuantity: "",
    expiredDateTime: new Date(),
    pickupLocation: "",
    foodStatus: "",
    foodImage: "",
    additionalNotes: "",
    requestDate: new Date(),
  });
  const [startDate, setStartDate] = useState(new Date());

  const queryClient = useQueryClient();

  const getMyFood = async () => {
    if (!user) return;

    const userEmail = user?.email;

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/foods/my-food/${userEmail}`
    );
    return data;
  };
  const {
    data: myFoods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: "myFoods",
    queryFn: getMyFood,
    enabled: !!user,
  });

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
      setSelectedFood(null);
    },
    onError: () => {
      console.error("Failed to delete food item");
      toast.error("Failed to delete food item");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ foodId, updates }) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/foods/${foodId}`,
        updates
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Food updated successfully");
      queryClient.invalidateQueries(["myFoods"]);
      document.getElementById("update_modal").close();
    },
    onError: () => {
      console.error("Failed to update food item");
      toast.error("Failed to update food item");
    },
  });

  const handleDelete = (foodId) => {
    setSelectedFood(foodId);
    document.getElementById("my_modal_3").showModal();
  };

  const handleConfirmDelete = () => {
    deleteFoodMutation.mutate(selectedFood);
  };

  const handleOpenUpdateModal = (food) => {
   setSelectedFood(food._id);
   setFormData({
     foodName: food.foodName,
     foodQuantity: food.foodQuantity,
     expiredDateTime: new Date(food.expiredDateTime),
     pickupLocation: food.pickupLocation,
     foodStatus: food.foodStatus,
     foodImage: food.foodImage,
     additionalNotes: food.additionalNotes,
     requestDate: new Date(food.requestDate),
   });
   document.getElementById("update_modal").showModal();
  };


  const handleCloseUpdateModal = () => {
     document.getElementById("update_modal").close();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const handleUpdateSubmit = (e) => {
      e.preventDefault();
      updateMutation.mutate({ foodId: selectedFood, updates: formData });
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
                  key={food._id}
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
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleOpenUpdateModal(food)}
                    >
                      Edit
                    </button>
                    <dialog id="update_modal" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div>
                          <form onSubmit={handleUpdateSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                              <div className="sm:col-span-2">
                                <label
                                  for="foodName"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Food Name
                                </label>
                                <input
                                  type="text"
                                  value={formData?.foodName}
                                  onChange={handleInputChange}
                                  name="foodName"
                                  id="foodName"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Type Food name"
                                  required
                                />
                              </div>
                              <div className="w-full">
                                <label
                                  for="foodImage"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Food Image
                                </label>
                                <input
                                  type="text"
                                 value={formData?.foodImage}
                                  onChange={handleInputChange}
                                  name="foodImage"
                                  id="foodImage"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Image URL"
                                  required
                                />
                              </div>
                              <div className="w-full">
                                <label
                                  for="foodQuantity"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  name="foodQuantity"
                                  value={formData?.foodQuantity}
                                  onChange={handleInputChange}
                                  id="foodQuantity"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="248"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="pickupLocation"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Pickup Location
                                </label>
                                <input
                                  type="text"
                                  name="pickupLocation"
                                  value={formData?.pickupLocation}
                                  onChange={handleInputChange}
                                  id="pickupLocation"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Pickup Location"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="foodStatus"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Food Status
                                </label>
                                <input
                                  type="text"
                                  name="foodStatus"
                                  value={formData?.foodStatus}
                                  onChange={handleInputChange}
                                  id="foodStatus"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Available"
                                  required
                                />
                              </div>
                              <div className="font-sans">
                                <label
                                  for="expiredDateTime"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Expire Date
                                </label>
                                <DatePicker
                                  value={new Date(
                                    formData?.expiredDateTime
                                  ).toLocaleDateString()}
                                  className="border p-2 rounded-md"
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                />
                              </div>
                              <div className="font-sans">
                                <label
                                  for="requestDate"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Request Date
                                </label>
                                <DatePicker
                                  value={new Date(
                                    formData?.requestDate
                                  ).toLocaleDateString()}
                                  className="border p-2 rounded-md"
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                />
                              </div>
                              <div className="sm:col-span-2">
                                <label
                                  for="additionalNotes"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Additional Notes
                                </label>
                                <textarea
                                  id="additionalNotes"
                                  value={formData?.additionalNotes}
                                  onChange={handleInputChange}
                                  name="additionalNotes"
                                  rows="8"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Your description here"
                                ></textarea>
                              </div>
                            </div>
                            <div className="flex my-2">
                              <form method="dialog">
                                <button
                                  type="submit"
                                  className="btn text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                  Save
                                </button>
                              </form>
                              <form method="dialog">
                                <button
                                  type="button"
                                  onClick={handleCloseUpdateModal}
                                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 btn"
                                >
                                  Cancel
                                </button>
                              </form>
                            </div>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    {/* delete */}
                    <div>
                      <button
                        onClick={() => handleDelete(food._id)}
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
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center btn"
                                >
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

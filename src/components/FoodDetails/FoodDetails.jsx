import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../shared/Loader/Loader";
import Error from "../../pages/Error/Error";

const FoodDetails = () => {
  const queryClient = useQueryClient()
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchFoodDetails = async (id) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/foods/${id}`
    );
    return data;
  };

 const {
   data: food = {},
   isLoading,
   isError,
 } = useQuery({
   queryKey: ["foods", id],
   queryFn: () => fetchFoodDetails(id),
   config: {
     refetchOnWindowFocus: false,
     refetchOnMount: false,
     refetchOnReconnect: false,
     refetchOnRevalidate: false,
     staleTime: 1000 * 60 * 60,
     cacheTime: 1000 * 60 * 60,
     retry: 3,
     retryDelay: 1000,
     retryOnMount: true,
     retryOnWindowFocus: true,
     retryOnReconnect: true,
     retryOnRevalidate: true,
   },
 });
  
  const {
    _id,
    foodImage,
    foodName,
    foodStatus,
    requestDate,
    foodQuantity,
    createdAt,
    pickupLocation,
    expiredDateTime,
    additionalNotes,
    donator: { name, image, email } = {},
  } = food || {};

  
  
  const requestFoodMutation = useMutation({
    mutationFn: async (requestData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/requests`,
        requestData
      );
      return data;
    },
    onSuccess: () => {
      navigate('/my-requests')
    },
    onError: () => {
      toast.error("Something is wrong! Please try again later");
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user?.email === food.donator?.email) {
      return toast.error("Action not permitted");
    }

    const form = e.target;
    const foodImage = form.foodImage.value;
    const foodName = form.foodName.value;
    const foodStatus = form.foodStatus.value;
    const requestDate = startDate;
    const expiredDateTime = startDate;
    const foodQuantity = form.foodQuantity.value;
    const pickupLocation = form.pickupLocation.value;
    const additionalNotes = form.additionalNotes.value;
    const email = user?.email;
    const donatorEmail = food.donator?.email;
    const foodId = food._id;

    const reqData = {
      foodId,
      foodImage,
      foodName,
      foodStatus,
      requestDate,
      expiredDateTime,
      foodQuantity,
      pickupLocation,
      additionalNotes,
      email,
      donatorEmail,
    };

    requestFoodMutation.mutate(reqData, {
      onSuccess: () => {
        toast.success("Your food request has been submitted successfully!");
        queryClient.invalidateQueries(["availableFoods"]);
        queryClient.invalidateQueries(["foods", id]);
        navigate("/my-requests");
      },
      onError: () => {
        toast.error("Something went wrong! Please try again later.");
      },
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col md:flex-row  items-center justify-around my-10 px-6 gap-5 md:max-w-screen-2xl mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 max-w-2xl">
        <div className="h-96">
          <img
            className="object-cover w-full h-full"
            src={foodImage}
            alt={foodName}
          />
        </div>
        <form
          action="
        "
        >
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
                world-class functionalities. Distinctively emasculated
                synergistic potentialities through enterprise opportunities.
                Collaboratively.
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
            </div>
          </div>
        </form>
      </div>

      {/* request section */}
      <div className="max-w-2xl">
        <section className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 px-16 py-5 md:px-10 md:py-[2.3rem] flex-1 border w-full">
          <h2 className="text-lg font-semibold text-gray-700 capitalize">
            Place Your Request Here
          </h2>

          <form onSubmit={handleFormSubmit}>
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
                  name="foodName"
                  id="foodName"
                  defaultValue={foodName}
                  disabled
                  readonly
                  className="bg-gray-200 border border-gray-300 disabled cursor-not-allowed text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                  name="foodImage"
                  defaultValue={foodImage}
                  id="foodImage"
                  className="bg-gray-200 border border-gray-300 disabled cursor-not-allowed text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Image URL"
                  disabled
                  aria-disabled
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
                  id="foodQuantity"
                  defaultValue={foodQuantity}
                  className="bg-gray-200 border border-gray-300 disabled cursor-not-allowed text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="248"
                  disabled
                  aria-disabled
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
                  defaultValue={pickupLocation}
                  id="pickupLocation"
                  className="bg-gray-200 border border-gray-300 disabled cursor-not-allowed text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Pickup Location"
                  disabled
                  aria-disabled
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
                  defaultValue={foodStatus}
                  id="foodStatus"
                  className="bg-gray-200 border border-gray-300 disabled cursor-not-allowed text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                <input
                  type="text"
                  name="expiredDateTime"
                  defaultValue={new Date(expiredDateTime).toLocaleDateString()}
                  id="expiredDateTime"
                  className="bg-gray-200 border border-gray-300 disabled cursor-not-allowed text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Available"
                  required
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
                  defaultValue={new Date(requestDate).toLocaleDateString()}
                  className="border p-2 rounded-md w-full"
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
                  name="additionalNotes"
                  defaultValue={additionalNotes}
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-6">
              <div className="cursor-pointer">
                <button
                  type="submit"
                  aria-label={
                    email === user?.email
                      ? "Sorry!, You can't make a request in this post"
                      : undefined
                  }
                  className={
                    email === user?.email
                      ? `disabled cursor-not-allowed btn btn-disabled`
                      : "text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  }
                  disabled={email === user?.email}
                >
                  Request Now
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default FoodDetails;

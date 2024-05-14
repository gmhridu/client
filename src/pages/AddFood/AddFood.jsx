import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import toast from "react-hot-toast";

const AddFood = () => {
  const [startDate, setStartDate] = useState(new Date());
 const { user } = useAuth();
 
 const handleAddFood = async(e) => {
  e.preventDefault()
  const form = e.target;
  const foodName = form.name.value;
  const foodImage = form.foodImage.value;
  const foodQuantity = form.foodQuantity.value;
  const expiredDateTime = startDate;
  const requestDate = startDate;
  const pickupLocation = form.pickupLocation.value;
  const foodStatus = form.foodStatus.value;
  const additionalNotes = form.additionalNotes.value;


  const addFood = {
    foodName,
    foodImage,
    foodQuantity,
    expiredDateTime,
    requestDate,
    foodStatus,
    pickupLocation,
    additionalNotes,
    donator: {
     email:user?.email,
     name: user?.displayName,
     image: user?.photoURL,
    },
  };

  try {
   const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/foods`, addFood)
   toast.success('Food Added Successfully')
   form.reset()

  } catch (err) {
   console.log(err.message)
   toast.error(err?.response?.data?.message || "Failed to post food" )
  }



 }
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 my-12">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Food
          </h2>
          <form onSubmit={handleAddFood}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Food Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
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
                  name="additionalNotes"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Food
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddFood;

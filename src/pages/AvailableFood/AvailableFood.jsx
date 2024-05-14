import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader/Loader";
import Error from "../Error/Error";
import FoodCard from "../../components/FoodCard/FoodCard";
import useRequestFood from "../../hooks/useRequestFood";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const axiosSecure = useAxiosSecure()
const fetchAvailableFoods = async () => {
  try {
    const { data } = await axiosSecure.get(`/foods`);
    const availableFoods = data.filter(
      (food) => food.foodStatus === "Available"
    );
    return availableFoods;
  } catch (error) {
    throw new Error("Failed to get available foods");
  }
};

const AvailableFood = () => {
  
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const requestFoodMutation = useRequestFood();
  const [requestedQuantity, setRequestedQuantity] = useState(1);

  const {
    isLoading,
    data: availableFoods = [],
    isError,
  } = useQuery({
    queryKey: ["availableFoods"],
    queryFn: fetchAvailableFoods,
    enabled: !!user,
  });

  const handleRequestFood = async (foodId, requestedQuantity) => {
    try {
      if (!Number.isInteger(requestedQuantity) || requestedQuantity <= 0) {
        throw new Error("Invalid requested quantity");
      }
      await requestFoodMutation.mutateAsync({ foodId, requestedQuantity });
      queryClient.invalidateQueries("availableFoods");
    } catch (error) {
      console.error("Error handling food request:", error.message);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="container px-6 py-10 mx-auto">
      <h1 className="text-2xl font-bold">
        Available Foods: {availableFoods.length}
      </h1>
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {availableFoods.map((food) => (
          <FoodCard key={food._id} food={food}>
            <div className="flex items-center mt-4">
              <input
                type="number"
                min="1"
                max={food.foodQuantity}
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(Number(e.target.value))}
                className="w-16 px-2 py-1 mr-2 border rounded-md"
              />
              <button
                onClick={() => handleRequestFood(food._id, requestedQuantity)}
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Request
              </button>
            </div>
          </FoodCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;

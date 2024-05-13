import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUpdateMyFoods = () => {
  const queryClient = useQueryClient();

  const updateMyFoods = async (foodId, updatedQuantity) => {
    try {
      const foodData = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${foodId}`
      );
      const updatedFoodQuantity = foodData.data.foodQuantity - updatedQuantity;

      if (updatedFoodQuantity <= 0) {
        queryClient.invalidateQueries("myFoods");
      } else {
        queryClient.setQueryData(["foods", foodId], (prevData) => ({
          ...prevData,
          foodQuantity: updatedFoodQuantity,
        }));
      }
    } catch (error) {
      console.error("Error updating food quantity:", error);
    }
  };

  return updateMyFoods;
};

export default useUpdateMyFoods;

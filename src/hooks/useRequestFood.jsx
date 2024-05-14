import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useRequestFood = () => {
  const queryClient = useQueryClient();

  const requestFoodMutation = useMutation({
    mutationFn: async ({ foodId, requestedQuantity }) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/requests`,
        {
          foodId,
          requestedQuantity,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("availableFoods");
    },
  });

  return requestFoodMutation;
};

export default useRequestFood;

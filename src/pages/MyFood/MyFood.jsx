import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader/Loader";
import Error from "../Error/Error";

const MyFood = () => {
  const { user } = useAuth();

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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  You Don't have added any food yet! To Add Food{" "}
          <span className="hover:text-blue-400 
                  underline">
                    <Link to={"/add-food"}>Click Here</Link>
                  </span>
                </td>
              </tr>
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
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                      Remove
                    </a>
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

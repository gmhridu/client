
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Error from "../pages/Error/Error";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddFood from "../pages/AddFood/AddFood";
import FoodDetails from "../components/FoodDetails/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <h1>about</h1>,
      },
      {
        path: "/contact",
        element: <h1>contact</h1>,
      },
      {
        path: "/my-foods",
        element: <h1>My Foods</h1>,
      },
      {
        path: "/add-food",
        element: <AddFood/>,
      },
      {
        path: '/food/:id',
        element: <FoodDetails />,
        loader: ({ params }) =>
           fetch(`${import.meta.env.VITE_API_URL}/foods/${params.id}`),
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/register',
        element: <Register/>,
      }
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
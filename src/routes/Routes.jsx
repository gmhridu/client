
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Error from "../pages/Error/Error";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddFood from "../pages/AddFood/AddFood";
import FoodDetails from "../components/FoodDetails/FoodDetails";
import MyFood from "../pages/MyFood/MyFood";
import MyRequest from "../pages/MyRequest/MyRequest";
import AvailableFood from "../pages/AvailableFood/AvailableFood";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

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
        element: (
          <PrivateRoutes>
            <MyFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/available-food",
        element: (
          <PrivateRoutes>
            <AvailableFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoutes>
            <FoodDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/foods/${params.id}`).then(
            (response) => response.json()
          ),
      },
      {
        path: "/my-requests",
        element: (
          <PrivateRoutes>
            <MyRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import RoomDetails from "../pages/Home/Rooms/RoomDetails/RoomDetails";
import Dashboard from "../layouts/Dashboard";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/rooms/${params.id}`),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // admin route
      {
        path: "/dashboard/adminHome",
        element: <AdminHome />,
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers />,
      },
      // users route
      {
        path: "/dashboard/myBookings",
        element: <MyBookings />,
      },
    ],
  },
]);

export default router;

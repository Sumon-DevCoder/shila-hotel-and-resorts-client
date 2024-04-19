import { Link, Outlet } from "react-router-dom";
import useBookings from "../hooks/useBookings";

const Dashboard = () => {
  const [bookings] = useBookings();

  const isAdmin = true;

  console.log(bookings);
  return (
    <div className="flex">
      <div className="w-64 bg-slate-600 text-gray-200 h-[100vh]">
        <ul className="space-y-2">
          {isAdmin ? (
            <>
              <li className="bg-green-400 p-2 rounded-lg">
                <Link to={"/dashboard/adminHome"}>Admin Home</Link>
              </li>
              <li className="bg-green-400 p-2 rounded-lg">
                <Link to={"/dashboard/adminHome"}>Manage Bookings</Link>
              </li>
              <li className="bg-green-400 p-2 rounded-lg">
                <Link to={"/dashboard/allUsers"}>Users</Link>
              </li>
            </>
          ) : (
            <>
              <li className="bg-green-400 p-2 rounded-lg">
                <Link to={"/dashboard/userHome"}>User Home</Link>
              </li>
              <li className="bg-green-400 p-2 rounded-lg">
                <Link to={"/dashboard/myBookings"}>My Bookings</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

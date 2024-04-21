import { Link, Outlet } from "react-router-dom";
import useBookings from "../hooks/useBookings";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [bookings] = useBookings();
  const [isAdmin] = useAdmin();

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
                <Link to={"/dashboard/addItems"}>Add Items</Link>
              </li>
              <li className="bg-green-400 p-2 rounded-lg">
                <Link to={"/dashboard/mangeitems"}>Manage Items</Link>
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
                <Link to={"/dashboard/myBookings"}>
                  My Bookings ({bookings?.length})
                </Link>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li className="bg-green-400 p-2 rounded-lg">
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

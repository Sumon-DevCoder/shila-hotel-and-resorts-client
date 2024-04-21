import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthContext from "./useAuthContext";

const useBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  //   console.log(user);

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings, user?.email"],
    queryFn: async () => {
      //   console.log(user);
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      //   console.log("check email", user.email);
      return res.data;
    },
  });

  return [bookings, refetch];
};

export default useBookings;

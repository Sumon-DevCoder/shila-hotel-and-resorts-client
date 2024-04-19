import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthContext from "./useAuthContext";

const useBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings, user?.email"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
  });

  return [bookings, refetch];
};

export default useBookings;

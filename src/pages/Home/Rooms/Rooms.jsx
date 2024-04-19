import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RoomCard from "../../../components/RoomCard/RoomCard";

const Rooms = () => {
  const axiosPublic = useAxiosPublic();

  const { data: rooms = [] } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await axiosPublic.get("/rooms");
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 my-10 container m-auto justify-items-center gap-y-10">
      {rooms?.map((room) => (
        <RoomCard key={room?._id} room={room} />
      ))}
    </div>
  );
};

export default Rooms;

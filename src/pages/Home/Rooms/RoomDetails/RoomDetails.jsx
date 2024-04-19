import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuthContext from "../../../../hooks/useAuthContext";
import Swal from "sweetalert2";

const RoomDetails = () => {
  const room = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddBooking = (room) => {
    if (user) {
      //
      const bookingInfo = {
        email: user?.email,
        title: room?.title,
        price: room?.price,
        image: room?.image,
        room_id: room?._id,
        description: room?.description,
      };

      axiosSecure.post("/bookings", bookingInfo).then((res) => {
        if (res.data.message) {
          Swal.fire({
            icon: "error",
            title: "Sorry",
            text: `${res.data.message}`,
            footer: '<a href="#">Plese Check your bookings history</a>',
          });
        }

        if (res.data.insertedId) {
          // success alert
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${room?.title} is bookings successful`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Fist login then you can booked",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //navigate
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="p-8 sm:p-16 md:p-10  bg-gray-400 ">
        <div data-theme="teal" className="mx-auto max-w-6xl">
          <section className="font-sans text-black">
            <div className="[ lg:flex  ] [ fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right ]">
              <div className="flex-shrink-0 self-stretch sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
                <div className="h-full">
                  <article className="h-full">
                    <div className="h-full">
                      <img
                        className="h-full object-cover"
                        src={room?.image}
                        width="733"
                        height="412"
                        alt='""'
                      />
                    </div>
                  </article>
                </div>
              </div>
              <div className="p-6 bg-grey">
                <div className="leading-relaxed space-y-3">
                  <h2 className="leading-tight text-4xl font-semibold">
                    {room?.title}
                  </h2>
                  <p className="font-medium">{room?.location}</p>
                  <div className="divider"></div>
                  <p className="">{room?.description}</p>
                  <div className="divider"></div>

                  <div className="flex  items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      Hosted by {room?.host?.name}
                    </h3>
                    <div className="avatar">
                      <div className="w-7 rounded-full">
                        <img src={room?.host.image} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 text-gray-400 font-medium">
                    <p>{room?.guests} guests </p>
                    <p>{room?.bathrooms} bathrooms </p>
                    <p>{room?.bedrooms} bedrooms </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleAddBooking(room)}
                    className="btn btn-primary bg-green-500 border-none btn-md w-full mt-4"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

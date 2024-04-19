import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBookings from "../../../hooks/useBookings";

const MyBookings = () => {
  const [bookings, refetch] = useBookings();
  const axiosSecure = useAxiosSecure();

  const handleDeleteBookings = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won'to ${item?.title} Cancel`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${item?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // success alert
            Swal.fire({
              title: "Cancel!",
              text: `Your ${item?.title} has been Cancel.`,
              icon: "success",
            });

            // refetch
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((item, index) => (
              <tr key={item?._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image} alt="bookings image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.title}</div>
                      <div className="text-sm opacity-50">{item?.location}</div>
                    </div>
                  </div>
                </td>
                <td>${item?.price}</td>
                <th>
                  <button className="btn btn-secondary btn-xs">Update</button>
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteBookings(item)}
                    className="btn btn-warning btn-xs"
                  >
                    Cancel
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;

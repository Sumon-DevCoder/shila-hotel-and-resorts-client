import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const { title, price, image, _id } = room || {};

  console.log(room);

  return (
    <>
      <Link
        to={`/details/${_id}`}
        className="card min-h-96 w-96 bg-base-100 shadow-xl"
      >
        <figure>
          <img src={image} alt="room image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="font-semibold">${price} night</p>
          <div className="card-actions justify-end"></div>
        </div>
      </Link>
    </>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomCard;

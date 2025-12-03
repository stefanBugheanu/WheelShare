import { useNavigate } from "react-router-dom";

export default function CarCard({ car, bookingDetails }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rent/${car._id}`, { state: bookingDetails });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col w-full max-w-xs mx-auto ">
      <img
        src={car.imageUrl}
        alt=""
        className="h-[45%] object-cover w-full rounded-t-2xl"
      />
      <div className="flex justify-between px-4 pt-2 font-bold text-xl">
        <h1>
          {car.brand} {car.model}
        </h1>

        <div className="flex flex-col items-end">
          <h1>{car.pricePerDay}RON</h1>
          <p className="text-sm font-normal text-gray-600">per day</p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 ">
        <p className="text-sm font-normal  ">{car.seats}passengers</p>
        <p className="text-sm font-normal  ">4 doors</p>
        <p className="text-sm font-normal  ">{car.transmission}</p>
        <p className="text-sm font-normal">{car.engine}</p>
      </div>

      <button
        className="cursor-pointer bg-blue-600 text-white rounded-xl py-3 px-5 hover:bg-blue-700 transition duration-200 w-[85%] my-4 mx-auto "
        onClick={handleClick}
      >
        Book now
      </button>
    </div>
  );
}

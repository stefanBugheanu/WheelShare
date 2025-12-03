export default function SimpleCar({ car }) {
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
    </div>
  );
}

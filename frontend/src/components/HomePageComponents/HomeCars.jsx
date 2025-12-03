import { useEffect, useState } from "react";
import axios from "axios";
import SimpleCar from "../commons/SimpleCar";

export default function HomeCars() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const pickup = today.toISOString();
      const returnDate = tomorrow.toISOString();

      const res = await axios.get(
        "http://localhost:5000/api/cars/available/byDate",
        {
          params: {
            pickup,
            returnDate,
          },
        }
      );
      setCars(res.data.slice(0, 4));
    } catch (err) {
      console.error("ERROR: ", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4">
      {cars.length === 0 ? (
        <h1 className="text-center col-span-full">No Cars Available</h1>
      ) : (
        cars.map((car) => <SimpleCar key={car._id} car={car} />)
      )}
    </section>
  );
}

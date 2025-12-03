import BookingForm from "./BookingForm";
import { useState } from "react";
import CarCard from "../commons/CarCard";
import axios from "axios";

export default function AvailableCars() {
  const [availableCars, setAvailableCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [afis, setAfis] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const handleFilter = (value) => {
    const newValue = activeFilter === value ? null : value;
    setActiveFilter(newValue);

    if (!newValue) {
      setFilteredCars(availableCars);
      return;
    }

    let filtered = [];

    if (newValue === "manual" || newValue === "automatic") {
      filtered = availableCars.filter((car) => car.transmission === newValue);
    } else if (newValue === "premium") {
      filtered = availableCars.filter((car) => car.pricePerDay > 150);
    } else if (newValue === "economy") {
      filtered = availableCars.filter((car) => car.pricePerDay <= 150);
    }

    setFilteredCars(filtered);
  };

  const clearFilters = () => {
    setActiveFilter(null);
    setFilteredCars(availableCars);
  };

  const handleBookingSubmit = async ({ pickup, returnDate }) => {
    setPickup(pickup);
    setReturnDate(returnDate);

    setLoading(true);
    try {
      const res = await axios.get("/api/cars/available/byDate", {
        params: {
          pickup,
          returnDate,
        },
      });
      setAvailableCars(res.data);
      setFilteredCars(res.data);
      setActiveFilter(null);
    } catch (err) {
      console.error("Eroare la fetching cars: ", err);
    } finally {
      setLoading(false);
      setAfis(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      â
      <BookingForm onSubmit={handleBookingSubmit} />
      {loading && (
        <p className="text-center text-blue-600 mt-6">Searching cars...</p>
      )}
      {!loading && availableCars.length > 0 && (
        <div className="max-w-[85%] mx-auto mt-10 ">
          <div className="flex gap-6">
            <div className="w-1/3 h-fit bg-slate-500 p-4 rounded-xl text-white ">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-4xl font-bold ">Filters</h3>
                <button
                  className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-xl transition cursor-pointer"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
              <h4 className="text-2xl font-bold mb-4">Transmission</h4>
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="filter"
                    checked={activeFilter === "manual"}
                    className="w-7 h-7 cursor-pointer"
                    onChange={() => handleFilter("manual")}
                  />
                  <label className="text-white text-lg">Manual</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="filter"
                    checked={activeFilter === "automatic"}
                    className="w-7 h-7 cursor-pointer"
                    onChange={() => handleFilter("automatic")}
                  />
                  <label className="text-white text-lg">Automatic</label>
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-4 mt-10">Class</h4>
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="filter"
                    checked={activeFilter === "premium"}
                    className="w-7 h-7 cursor-pointer"
                    onChange={() => handleFilter("premium")}
                  />
                  <label className="text-white text-lg">Premium</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="filter"
                    checked={activeFilter === "economy"}
                    className="w-7 h-7 cursor-pointer"
                    onChange={() => handleFilter("economy")}
                  />
                  <label className="text-white text-lg">Economy</label>
                </div>
              </div>
            </div>

            <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  bookingDetails={{
                    pickup,
                    returnDate,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {afis && !loading && filteredCars.length === 0 && (
        <p className="text-center text-red-600 mt-6">
          No cars match this filter. Try another.
        </p>
      )}
    </div>
  );
}

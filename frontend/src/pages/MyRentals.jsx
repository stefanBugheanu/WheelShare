import { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const confirmCancel = (rentalId) => {
    setSelectedRental(rentalId);
    setShowConfirm(true);
  };

  const fetchRentals = async () => {
    try {
      const res = await api.get("/rentals/me");
      console.log(" Rezervări primite:", res.data);
      setRentals(res.data);
    } catch (err) {
      console.error("Eroare rentals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleCancel = async (rentalId) => {
    try {
      await api.delete(`/rentals/${rentalId}`);
      setRentals((prev) => prev.filter((r) => r._id !== rentalId));
    } catch (err) {
      console.error("Eroare la anulare:", err);
    }
  };

  return (
    <div className="pt-26 min-h-screen bg-blue-100">
      <h2 className="text-5xl font-bold mb-6 text-center text-gray-500">
        My Rentals
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : rentals.length === 0 ? (
        <p className="text-4xl text-center mt-22">
          You don't have any reservations yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 w-[50%] mx-auto py-7 ">
          {rentals.map((rental) => {
            const car = rental.car;
            if (!car) return null;

            const start = dayjs(rental.startDate);
            const now = dayjs();
            const canCancel = start.isAfter(now) && rental.status === "active";

            return (
              <div
                key={rental._id}
                className=" rounded-xl shadow-lg bg-gray-200 p-4 flex flex-row "
              >
                <div className="flex-1  ">
                  <h3 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h3>
                  <p>From: {start.format("DD MMM YYYY")}</p>
                  <p>Until: {dayjs(rental.endDate).format("DD MMM YYYY")}</p>
                  <p>
                    {rental.pickupTime} - {rental.dropOffTime}
                  </p>
                  <p></p>
                  <p className="font-bold">Price: {rental.totalPrice} RON</p>
                  {canCancel && (
                    <button
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                      onClick={() => confirmCancel(rental._id)}
                    >
                      Cancel rental
                    </button>
                  )}
                </div>
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="h-full object-cover rounded mb-2"
                />
              </div>
            );
          })}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              Are you sure you want to cancel the rental?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  handleCancel(selectedRental);
                  setShowConfirm(false);
                  setSelectedRental(null);
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400  cursor-pointer"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedRental(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

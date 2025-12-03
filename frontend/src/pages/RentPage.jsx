import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RentPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const [car, setCar] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const pickup = new Date(state?.pickup);
  const returnDate = new Date(state?.returnDate);

  const formatDate = (date) => date?.toLocaleDateString("ro-RO") || "N/A";

  const formatHour = (date) =>
    date?.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) || "N/A";

  const getDayDiff = (start, end) => {
    if (!start || !end) return 0;
    const msDiff = end - start;
    return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
  };

  const days = getDayDiff(pickup, returnDate);
  const totalPrice = car ? days * car.pricePerDay : 0;

  const handlePayment = async () => {
    if (!isChecked) {
      setError("You must check the box before proceeding!");
      return;
    }

    setError("");

    try {
      const res = await axios.post("/api/payments/checkout", {
        carId: car._id,
        startDate: pickup.toISOString(),
        endDate: returnDate.toISOString(),
        pickupTime: formatHour(pickup),
        dropOffTime: formatHour(returnDate),
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Something went wrong while creating the payment session.");
    }
  };

  useEffect(() => {
    axios.get(`/api/cars/${id}`).then((res) => setCar(res.data));
  }, [id]);

  if (!car) return <p className="text-center pt-25">Loading car...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-[40%]  h-[90%] bg-white rounded-xl shadow-md  mx-auto flex flex-col items-start p-4">
        <h2 className="text-4xl font-bold my-3 mx-auto">
          {car.brand} {car.model}
        </h2>
        <hr className="border-black-300 mb-4" />
        <h3 className="text-3xl font-semibold mb-2">Rental Summary</h3>
        <div className="text-sm space-y-1">
          <div className="flex items-baseline gap-2">
            <p className="text-blue-600 font-bold text-2xl">Price per day:</p>
            <span className="text-black text-2xl">{car.pricePerDay} RON</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-blue-600 font-bold text-2xl">Pickup date:</p>
            <span className="text-black text-2xl">{formatDate(pickup)}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-blue-600 font-bold text-2xl">Pickup hour:</p>
            <span className="text-black text-2xl">{formatHour(pickup)}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-blue-600 font-bold text-2xl">Return date:</p>
            <span className="text-black text-2xl">
              {formatDate(returnDate)}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-blue-600 font-bold text-2xl">Return hour:</p>
            <span className="text-black text-2xl">
              {formatHour(returnDate)}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-black text-2xl">
              <strong className="text-blue-600">Total days:</strong> {days}{" "}
              {days === 1 ? "day" : "days"}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-black text-2xl">
              <strong className="text-blue-600">Total price:</strong>{" "}
              {totalPrice.toFixed(2)} RON
            </p>
          </div>
        </div>
        <hr className="border-black-300 mt-4" />
        {error && (
          <p className="text-center text-red-600 font-medium text-md my-3 w-full">
            {error}
          </p>
        )}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 mr-2"
          />
          <label className="text-sm text-gray-700">
            By checking this box, you agree that you have a valide driver's
            license!
          </label>
        </div>
        <button
          className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer "
          onClick={handlePayment}
        >
          Pay
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ro from "../../locales/ro";
import { isAfter, setHours, setMinutes } from "date-fns";

export default function BookingForm({ onSubmit }) {
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupHour, setPickupHour] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [returnHour, setReturnHour] = useState(null);
  const [error, setError] = useState("");
  let errorTimer = null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupDate || !pickupHour || !returnDate || !returnHour) {
      setError("All fields are mandatory!");
      return;
    }

    const pickup = new Date(pickupDate);
    pickup.setHours(pickupHour.getHours(), pickupHour.getMinutes(), 0, 0);

    const ret = new Date(returnDate);
    ret.setHours(returnHour.getHours(), returnHour.getMinutes(), 0, 0);

    if (!isAfter(ret, pickup)) {
      if (errorTimer) clearTimeout(errorTimer);

      errorTimer = setTimeout(() => {
        setError("Choose again the interval!");
      }, 1000);

      return;
    }

    setError("");
    console.log("🚗 SUBMIT:");
    console.log("pickup:", pickup.toISOString());
    console.log("return:", ret.toISOString());

    onSubmit({
      pickup: pickup.toISOString(),
      returnDate: ret.toISOString(),
    });
  };

  return (
    <div className=" bg-gray-50 mt-20 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[85%] mx-auto bg-gradient-to-b from-blue-100 to-gray-100 p-8 rounded-2xl shadow-2xl shadow-blue-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Booking a car
        </h2>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 w-fit mx-auto gap-x-40 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pick date</label>
            <DatePicker
              selected={pickupDate}
              onChange={setPickupDate}
              dateFormat="dd/MM/yyyy"
              locale={ro}
              minDate={new Date()}
              className="w-full border px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-200"
              placeholderText="Select pickup date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Return date
            </label>
            <DatePicker
              selected={returnDate}
              onChange={setReturnDate}
              dateFormat="dd/MM/yyyy"
              locale={ro}
              minDate={pickupDate || new Date()}
              className="w-full border px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-200"
              placeholderText="Select return date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pick hour</label>
            <DatePicker
              selected={pickupHour}
              onChange={setPickupHour}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Hours"
              dateFormat="HH:mm"
              locale={ro}
              minTime={setHours(setMinutes(new Date(), 30), 7)}
              maxTime={setHours(setMinutes(new Date(), 0), 20)}
              className="w-full border px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-200"
              placeholderText="Select pickup hour"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Return hour
            </label>
            <DatePicker
              selected={returnHour}
              onChange={setReturnHour}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Hours"
              dateFormat="HH:mm"
              locale={ro}
              minTime={setHours(setMinutes(new Date(), 30), 7)}
              maxTime={setHours(setMinutes(new Date(), 0), 20)}
              className="w-full border px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-200"
              placeholderText="Select return hour"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-lg mb-4 text-center">{error}</p>
        )}

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl cursor-pointer transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

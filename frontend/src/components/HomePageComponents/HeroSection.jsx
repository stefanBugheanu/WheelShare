import CarImage from "../../assets/CarHomeImage.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleButton = () => {
    if (user) {
      navigate("/cars");
    } else {
      navigate("/login", { state: { from: "/cars" } });
    }
  };

  return (
    <div className="relative w-full h-[70vh] flex flex-col lg:flex-row items-center  lg:justify-between sm:px-10 ">
      <img
        src={CarImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_80%] z-0 opacity-85 brightness-70"
      />
      <div className="absolute top-40 z-10 w-full max-w-xl px-4 sm:px-8 lg:px-20 lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Airport Car Rentals
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white my-3">
          Premium car rental service directly at the airport. Just pick up and
          return your car with ease.
        </p>
        <button
          onClick={handleButton}
          className="cursor-pointer bg-blue-600 text-white rounded-2xl py-3 px-5 hover:bg-blue-700 transition duration-200 "
        >
          Browse cars
        </button>
      </div>
    </div>
  );
}

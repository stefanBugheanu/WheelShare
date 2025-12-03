import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleButton = () => {
    if (user) {
      navigate("/cars");
    } else {
      navigate("/login", { state: { from: "/cars" } });
    }
  };

  return (
    <div className="max-w-full  bg-gray-800 ">
      <div className="flex flex-row p-7 items-center">
        <p className="text-5xl font-Rubik max-w-[50%] text-white  ">
          Ready to start your journey? Book a car right now!
        </p>
        <button
          onClick={handleButton}
          className="cursor-pointer bg-blue-600 text-white rounded-2xl py-3 px-5 hover:bg-blue-700 transition duration-200 h-[10%]"
        >
          Book a car
        </button>
      </div>
    </div>
  );
}

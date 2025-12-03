import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LoginImage from "../assets/LoginImage.jpg";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData.name, formData.email, formData.password);
    navigate(from, { state: { from } });
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        src={LoginImage}
        alt="Background"
        className=" w-full h-full object-cover object-right  "
      />{" "}
      <h1 className="text-white text-6xl absolute top-30 left-5 max-w-[50%] font-Rubik font-bold">
        Rent a car from Bucharest Airport
      </h1>
      <div className="w-[30%]  absolute top-0 right-10 h-full flex items-center z-10 ">
        <form
          onSubmit={handleSubmit}
          className=" p-8 bg-white rounded-xl shadow-2xl h-[70%]"
        >
          <h2 className="text-4xl font-bold mb-6 text-orange-500 text-center">
            Sign Up
          </h2>

          <label className="font-semibold">Name:</label>
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 w-full mb-4 rounded-lg"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label className="font-semibold">Email:</label>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4 rounded-lg"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label className="font-semibold">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-6 rounded-lg"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg w-full font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

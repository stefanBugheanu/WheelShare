import AboutImage from "../assets/AboutUs_img.png";
import Footer from "../components/commons/Footer";

export default function AboutUs() {
  return (
    <div className="h-screen flex flex-col overflow-hidden pt-22 ">
      <div className="flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full">
          <img
            src={AboutImage}
            alt="About us"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-1/2 w-full h-1/2 lg:h-full bg-gradient-to-r from-20% to-85% from-white to-orange-300 p-10 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Welcome to <span className="text-6xl">WheelShare</span>
          </h2>
          <div className="text-xl">
            <p className="mb-4">
              Our mission is to simplify the way people access vehicles by
              offering a seamless, digital rental experience. Whether you're
              traveling for business, planning a weekend trip, or just need a
              ride across the city, WheelShare helps you book the right car in
              just a few clicks.
            </p>
            <p className="mb-4">
              We believe that transparency and reliability are essential when it
              comes to mobility. That’s why we’ve built a platform that puts
              users first — from intuitive browsing to secure payments and
              real-time availability.
            </p>
            <p className="mb-4">
              Join the growing community of drivers who choose smart, flexible,
              and stress-free car rentals.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import {
  MagnifyingGlassIcon,
  CalendarIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import StepCard from "./StepCard";

export default function HowItWorksSection() {
  return (
    <section className=" py-10  max-w-[80%] mx-auto ">
      <div className="flex justify-center items-center flex-col gap-4">
        <p className="text-blue-700 text-3xl">How it works</p>
        <p className="font-bold text-5xl ">Simple Rental Process</p>
        <p className="text-3xl text-gray-600">
          Rent a car in just few simple steps and start your journey
        </p>
      </div>

      <div className="pt-10 grid grid-cols-3 gap-10 h-full ">
        <StepCard
          Icon={MagnifyingGlassIcon}
          title="Choose your car"
          description="Browse our selection of vehicles and choose the one that suits you the
          best."
        />
        <StepCard
          Icon={CalendarIcon}
          title="Make a Reservation"
          description="Select your pickup and drop-off dates and times, fill in your
                details and confirm your booking!"
        />
        <StepCard
          Icon={KeyIcon}
          title="Pick up your car"
          description="Go to the location you selected and pick up your car and you are
                ready to go! Enjoy your trip!"
        />
      </div>
    </section>
  );
}

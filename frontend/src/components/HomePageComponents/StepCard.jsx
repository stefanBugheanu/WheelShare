export default function HeroSection({ Icon, title, description }) {
  return (
    <div className="w-full bg-white min-h-[40vh] shadow-lg rounded-2xl">
      <div className="w-full bg-blue-500 h-[20%] flex justify-center items-center">
        <Icon className="w-8 h-8 text-white  " />
      </div>
      <div className="pt-8 px-6 ">
        <p className="text-2xl font-bold ">{title}</p>
        <p className="text-gray-600 pt-2 text-xl">{description}</p>
      </div>
    </div>
  );
}

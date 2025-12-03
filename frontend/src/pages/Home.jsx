import { useAuth } from "../auth/AuthContext.jsx";
import HeroSection from "../components/HomePageComponents/HeroSection.jsx";
import HowItWorksSection from "../components/HomePageComponents/HowItWorksSection.jsx";
import HomeCars from "../components/HomePageComponents/HomeCars.jsx";
import Footer from "../components/commons/Footer.jsx";
export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <div className="max-w-full  ">
        <h1 className="p-10 font-Rubik text-5xl text-gray-800 font-bold text-center ">
          Here, you can pick some cars from our current selection!
        </h1>
        <HomeCars />
      </div>
      <div className="mt-5"></div>
      <Footer />
    </div>
  );
}

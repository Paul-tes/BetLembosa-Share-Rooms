"use client"
import React, { useState } from "react";
import Image from "next/image";
import NavLoad from "@/components/common/NavLoad";

// import logs
import BetLembosaLogo from "../../svg/LogoB.png"

// import step views
import Overview from "@/components/process/Overview";
import StepOneStarter from "@/components/process/StepOneStarter";
import HomeTypeSelector from "@/components/process/HomeTypeSelector";
import HomePlaceType from "@/components/process/HomePlaceType";
import PlaceLocation from "@/components/process/PlaceLocation";
import PlaceDetails from "@/components/process/PlaceDetails";
import FloorPlan from "@/components/process/FloorPlan";
import StepTwoStarter from "@/components/process/StepTwoStarter";
import ProcessAmeneties from "@/components/process/ProcessAmeneties";
import Photos from "@/components/process/Photos";
import Title from "@/components/process/Title";
import Description from "@/components/process/Description";
import StepThreeStarter from "@/components/process/StepThreeStarter";
import Price from "@/components/process/Price";
import HomeHosted from "@/components/process/HomeHosted";


const Page = () => {
  // handle steps state[numerical]
  const [step, setStep] = useState(0);

  // next step 
  const handleNext = ()=> {
    setStep(step + 1);
  }

  // previous step
  const handlePrevious = ()=> {
    setStep(step - 1);
  }

  // get step View
  const stepView = () => {
    switch (step) {
      case 0:
        return <Overview />;
      case 1:
        return <StepOneStarter />;
      case 2:
        return <HomeTypeSelector />;
      case 3:
        return <HomePlaceType />;
      case 4:
        return <PlaceLocation />;
      case 5:
        return <PlaceDetails />;
      case 6:
        return <FloorPlan />;
      case 7:
        return <StepTwoStarter />;
      case 8:
        return <ProcessAmeneties />;
      case 9:
        return <Photos />;
      case 10:
        return <Title />;
      case 11:
        return <Description />;
      case 12:
        return <StepThreeStarter />;
      case 13:
        return <Price />;
      case 14:
        return <HomeHosted />;
      default:
        return <></>;
    }
  };

  return (
    <div className=" grid grid-rows-new-listing h-[100vh]">
      <header className="flex items-center px-20 justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
        <div className="w-max cursor-pointer">
           <Image
            src={BetLembosaLogo}
            alt="BetLembosa Logo"
            width={40}
          />
          </div>
        </div>
        {step <= 13 && (
          <NavLoad />
        )}
      </header>
      <div>
        {
          stepView()
        }
      </div>
      {
        /* {step <= 13 && ( */
      }
      <footer
        className={`flex ${
          step > 0 ? "justify-between" : "justify-end"
        } items-center px-20 pb-4  border-t-4 border-t-gray-300 `}
      >
        {step >= 1 && (
          <button
            className=" py-3 mt-5  px-10 text-betlembosa-light-black underline hover:bg-gray-200 text-base font-medium rounded-md cursor-pointer"
            onClick={handlePrevious}
          >
            Back
          </button>
        )}
        {step !== 0 ? (
          <button
            className="bg-[#222222] py-3 mt-5  px-10 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-betlembosa-gradient py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={handleNext}
          >
            Get Started
          </button>
        )}
      </footer>
      {/* )} */}
    </div>
  );
};

export default Page;

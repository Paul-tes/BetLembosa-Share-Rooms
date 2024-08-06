import React from "react";

const StepOneStarter = () => {
  return (
    <div className="flex items-center h-full mx-20">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-betlembosa-light-black">
          <h3 className="text-2xl">Step 1</h3>
          <h1 className="text-4xl">
            <strong>Tel us about your place</strong>
          </h1>
          <p className="text-xl">
            In this step, we’ll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know
            the location and how many guests can stay.
          </p>
        </div>
        <div className="">
          <video src="/home.mp4" autoPlay loop controls={false}></video>
        </div>
      </div>
    </div>
  );
};

export default StepOneStarter;

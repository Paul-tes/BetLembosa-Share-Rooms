import React from "react";

// import all svg icons
import { hostTypes } from "@/data/HostTypes";

// import location type and setLocation type state from useAppStore;
import { useAppStore } from "@/store/store";

const HomeTypeSelector = () => {

  const { homeType, setHomeType } = useAppStore();

  const haddleSelection = (type) => {
    setHomeType(type);
  }

  return (
    <div className="flex justify-center items-center  max-h-[80vh] h-[80vh]">
      <div>
        <h2 className="font-semibold text-4xl">
          Which of these best describes your place?
        </h2>
        <div className="grid grid-cols-3 gap-5 max-h-[70vh] overflow-auto scroll no-scrollbar my-10 pb-5">
          {hostTypes.map((type) => (
            <button
              key={type.name}
              className={`flex flex-row gap-2 font-semibold border border-gray-300 rounded-md p-3 hover:border-gray-950 transition-all duration-300 
                ${
                  type.name === homeType && "border-gray-600 bg-blue-gray-50"
                }`}
              onClick={() => haddleSelection(type.name)}
            >
              {type.svgPath}
              <span className="mt-3" >{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTypeSelector;

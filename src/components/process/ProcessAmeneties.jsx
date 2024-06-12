import React from "react";
import { useAppStore } from "@/store/store";
import { AmenetiesType } from "@/data/Amenities";

const ProcessAmeneties = () => {
  const { placeAmenities, setPlaceAmenities } = useAppStore();
  const addAmenety = (name) => {
    setPlaceAmenities([...placeAmenities, name]);
  };
  const removeAmenty = (name) => {
    const index = placeAmenities.findIndex((amenetiy) => amenetiy === name);
    if (index) {
      const clonedAmenties = [...placeAmenities];
      clonedAmenties.splice(index, 1);
      setPlaceAmenities(clonedAmenties);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl">
          Tell guests what your place has to offer
        </h2>
        <p>You can add more amenities after you publish your listing.</p>
        <div className="flex flex-col gap-5 max-h-[65vh] overflow-auto scroll no-scrollbar">
          {AmenetiesType.map(({ type, data }) => (
            <div key={type} className="flex flex-col gap-5">
              {type === "advanced" && (
                <span className="text-lg font-medium">
                  Do you have any standout amenities?
                </span>
              )}
              {type === "safety" && (
                <span className="text-md font-medium">
                  Do you have any of these safety items?
                </span>
              )}

              <div className="grid grid-cols-3 gap-5">
                {data.map(({ name, svgPath }) => (
                  <button
                    key={name}
                    className={` flex flex-row justify-start font-semibold border border-gray-300 rounded-md p-3 hover:border-gray-950 transition-all duration-300 ${
                      placeAmenities?.find((amentiy) => amentiy === name) &&
                      "border-gray-950 bg-slate-200"
                    }`}
                    onClick={() => {
                      placeAmenities?.includes(name)
                        ? removeAmenty(name)
                        : addAmenety(name);
                    }}
                  >
                    {svgPath}
                    <span className="text-betlembosa-light-black font-medium mt-3">
                      {name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default ProcessAmeneties;
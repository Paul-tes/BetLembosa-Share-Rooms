import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { createHomeAPI } from "@/lib/host";
import { useAppStore } from "@/store/store";

export default function ListingCreated() {
  const router = useRouter();
  // creation of Host

  // grasp all host data from store.
  const {
    homeType,
    placeType,
    mapData,
    locationData,
    placeSpace,
    placeAmenities,
    photos,
    title,
    description,
    price,
  } = useAppStore();

  // when it mount this HomeHosted component it will try to create home throgh the api.
  useEffect(() => {
    createHomeAPI({
      homeType,
      placeType,
      mapData: JSON.stringify(mapData),
      locationData: JSON.stringify(locationData),
      placeSpace: JSON.stringify(placeSpace),
      placeAmenities,
      photos,
      title,
      description,
      price,
    });
  }, [
    homeType,
    placeType,
    mapData,
    locationData,
    placeSpace,
    placeAmenities,
    photos,
    title,
    description,
    price,
  ]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="font-semibold text-4xl">Congratulations!</h2>
        <p>You have successfully created your listing!</p>
        <div className="flex gap-5">
          <button
            className="bg-[#222222] py-3 mt-5  px-10 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={() => router.push("/")}
          >
            Visit Home Page
          </button>
          <button
            className="bg-betlembosa-gradient py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={() => router.push("/my-hosts")}
          >
            View your Hosts
          </button>
        </div>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
}
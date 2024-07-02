"use client";

import AuthModal from "@/components/auth/AuthModal";
import CompactFooter from "@/components/footer/CompactFooter";
import dynamic from "next/dynamic";
import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import ListingPhotos from "./components/HomePhotos";
import TripScheduler from "./components/TripScheduler";
import ListingAmenties from "./components/HomeAmenties";
import ListingMap from "./components/HomeMap";
import { getHome } from "@/lib/host";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

export default function Page({ params}) {
  const { isAuthModalOpen, currentListing, setCurrentListing } = useAppStore();
  const { listing: homeId } = params;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getHome(homeId);
        setCurrentListing(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (homeId) {
      getData();
    } else {
      console.warn("homeId is not provided or is falsy:", homeId);
    }
  }, [homeId, setCurrentListing]);

  return (
    <div>
      {console.log(currentListing)}
      {currentListing ? (
        <div>
          <Navbar />
          <div
            className="px-20 pt-10 text-betlembosa-light-black grid gap-10"
            style={{ gridTemplateColumns: "70fr 30fr" }}
          >
            <div className="flex flex-col gap-5 mt-16">
              <div className="flex flex-col gap-1">
                <h2 className="text-5xl">{currentListing?.title}</h2>
                <span className="text-lg cursor-pointer underline">
                  {JSON.parse(currentListing?.locationData)?.landmark}
                </span>
              </div>
              <ListingPhotos />
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold">
                    {currentListing?.locationType} hosted by{" "}
                    {currentListing?.CreatedBy}{" "}
                  </h3>
                  <ul className="flex gap-5">
                    {Object.keys(JSON.parse(currentListing.placeSpace)).map((type) => (
                      <li
                        className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start w-32"
                        key={type}
                      >
                        <span className="text-2xl font-semibold">
                          {JSON.parse(currentListing.placeSpace)[type]}
                        </span>
                        <span className="capitalize">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p>{currentListing?.description}</p>
                <ListingAmenties />
                <ListingMap />
              </div>
            </div>
            <div className="mt-16">
              <TripScheduler />
            </div>
          </div>
          <CompactFooter />
          {isAuthModalOpen && <AuthModal />}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

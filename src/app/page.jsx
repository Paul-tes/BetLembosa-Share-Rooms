"use client";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {ssr:false})
import Footer from "@/components/footer/Footer";
import AuthModal from "@/components/auth/AuthModal";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/store";
import { getAllHomes } from "@/lib/host";
import { hostTypes } from "@/data/HostTypes";
import ListView from "@/components/views/ListView";
import ViewSwitchBadge from "@/components/views/ViewSwitchBadge";
import MapView from "@/components/views/MapView";
import dynamic from "next/dynamic";
import AlertPop from "@/components/common/Alert";
import { getHomeTypeSearch } from "@/lib/host";

const Home = () => {

  // States
  const [error, setError] = useState("");
  const { isAuthModalOpen, setListings, isMapView } = useAppStore();


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllHomes();
        setListings(data);
      } catch (error) {
        setError(error.message || "An unknown error occurred");
      }
    };

    getData();
  }, [setListings]);


  // clearing ther error message and the alert.
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // haddle home type Search
  const haddleSearch = (typeName) => async () => {
    try {
      const data = await getHomeTypeSearch(typeName);
      setListings(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return <div>
    <Navbar isHome={true}/>
    <div className="flex items-center justify-center">
        <div className="w-[90vw] overflow-auto no-scrollbar mt-32 px-5">
          <ul className="flex gap-5 h-full">
            {hostTypes.map((data) => (
              <li
                onClick={haddleSearch(data.name)} 
                key={data.name}
                className="w-max flex flex-col items-center justify-between h-16 cursor-pointer hover:p-2 hover:shadow-lg hover:shadow-blue-gray-600"
              >
                <span className="h-10 w-10  flex items-center justify-center">
                  {data.svgPath}
                </span>
                <div
                  className="text-xs font-semibold break-keep"
                  style={{ width: "inherit" }}
                >
                  {data.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    <ViewSwitchBadge />
    {
      isMapView ? <MapView /> : <ListView />
    }
    
    <Footer />
    {isAuthModalOpen && <AuthModal />}
    {error && <AlertPop message={error}/>}
  </div>;
};

export default Home;

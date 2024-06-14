"use client";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {ssr:false})
import Footer from "@/components/footer/Footer";
import AuthModal from "@/components/auth/AuthModal";
import React, { useEffect } from "react";
import { useAppStore } from "@/store/store";
import { getAllHomes } from "@/lib/host";
import { hostTypes } from "@/data/HostTypes";
import ListView from "@/components/views/ListView";
import ViewSwitchBadge from "@/components/views/ViewSwitchBadge";
import MapView from "@/components/views/MapView";
import dynamic from "next/dynamic";

const Home = () => {

  // States
  const { isAuthModalOpen, setListings, isMapView } = useAppStore();


  useEffect(() => {
    const getData = async () => {
      const data = await getAllHomes();
      setListings(data);
    }
    getData();
  }, [setListings]);

  return <div>
    <Navbar/>
    <div className="flex items-center justify-center">
        <div className="w-[90vw] overflow-auto no-scrollbar mt-32 px-5">
          <ul className="flex gap-5 h-full">
            {hostTypes.map((data) => (
              <li
                key={data.name}
                className="w-max flex flex-col items-center justify-between h-16 cursor-pointer"
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
    {
      isAuthModalOpen && <AuthModal />
    }
  </div>;
};

export default Home;

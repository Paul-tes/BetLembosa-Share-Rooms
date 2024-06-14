"use client";
import React from "react";
import { BsFillMapFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useAppStore } from "@/store/store";

function ViewSwitchBadge() {
  const { isMapView, setMapView } = useAppStore();

  return (
    <div className="fixed flex justify-center items-center bottom-8 left-0 right-0 cursor-pointer z-50">
      <div className="btn bg-blue-950 text-white px-4 py-3 rounded-full shadow-lg ">
        <span
          className="flex items-center gap-2 text-sm"
          onClick={() => setMapView()}
        >
          {!isMapView ? (
            <>
              Show Map <BsFillMapFill />
            </>
          ) : (
            <>
              Show List <AiOutlineUnorderedList />
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default ViewSwitchBadge;
"use client";
import CompactFooter from "@/components/footer/CompactFooter";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import { getMyHosts } from "@/lib/host";
import ListingCard from "@/components/listingCard";
import dynamic from "next/dynamic";

export default function Page() {
  const { setUserListings, userListings } = useAppStore();
  useEffect(() => {
    const getData = async () => {
      const data = await getMyHosts();
      setUserListings(data);
    };

    getData();

  }, [setUserListings]);

  return (
    <div>
      <Navbar />
      <div className=" flex justify-start items-start">
        {userListings.length > 0 ? (
          <div className="grid grid-cols-4 px-10 gap-3 py-10   w-full items-start ">
            {userListings?.map((listing, index) => (
              <ListingCard data={listing} key={index} isMyListing />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h1>No Listings for current user. Create new Listings.</h1>
          </div>
        )}
      </div>
      <CompactFooter />
    </div>
  );
}
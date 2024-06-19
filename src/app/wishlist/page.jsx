"use client";
import CompactFooter from "@/components/footer/CompactFooter";
import ListingCard from "@/components/listingCard";
import { useAppStore } from "@/store/store";
import React from "react";

import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

export default function Page() {
  const { wishListsPage } = useAppStore();
  return (
    <div>
      <Navbar />
      <div className="h-[82.5vh] flex justify-start items-start">
        {wishListsPage?.length > 0 ? (
          <div className="grid grid-cols-4 px-5 py-10 h-[75vh] overflow-auto no-scrollbar w-full items-start mt-20">
            {wishListsPage?.map((listing, index) => (
              <ListingCard
                data={listing}
                key={index}
                isWishList={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h1>No Wishlists for current user. Add new Wishlists.</h1>
          </div>
        )}
      </div>
      <CompactFooter />
    </div>
  );
}
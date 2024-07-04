import React from "react";
import ListingCard from "../listingCard";
import { useAppStore } from "@/store/store";


export default function ListView() {
  const { listings } = useAppStore();
  return (
    <div className="grid grid-cols-3 px-20 gap-8 py-10  justify-start items-startP">
      {listings?.map((listing, index) => (
        <ListingCard data={listing} key={index} />
      ))}
    </div>
  );
}
import React from "react";
import Image from "next/image";

const ListingCard = ({ data }) => {
  console.log(data)
  return (
    <div className="flex items-center justify-center flex-col gap-1">
      <div className="flex items-center justify-center cursor-pointer w-full ">
        <div className="flex flex-col gap-2">
          <div className="relative w-64 h-56 ">
            <Image
              src={data.photos[0]}
              fill
              alt="Home Listing Photo"
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <h3>{data.title}</h3>
            <span>${data.price} night</span>
          </div>
        </div>

      </div>
    </div>
  )
};

export default ListingCard;

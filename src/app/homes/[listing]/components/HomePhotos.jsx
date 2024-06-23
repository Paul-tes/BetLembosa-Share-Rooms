import Image from "next/image";
import React, { useState } from "react";
import { useAppStore } from "@/store/store";

export default function HomePhotos() {
  const { currentListing } = useAppStore();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  return (
    <div className="flex gap-5 flex-col">
      <div className="relative w-full h-[60vh] shadow-md shadow-blue-500">
        <Image alt="listing" fill src={currentListing.photos[currentPhoto]} />
      </div>
      {currentListing.photos.length > 1 && (
        <ul className="flex gap-5 flex-wrap">
          {currentListing.photos.map((photo, index) => (
            <li
              key={photo}
              className="relative w-48 h-32 cursor-pointer"
              onClick={() => setCurrentPhoto(index)}
            >
              <Image alt="listing" fill src={photo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
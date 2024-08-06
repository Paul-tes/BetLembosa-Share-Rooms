import React, { useMemo } from "react";
import Pin from "@/components/common/Pin";
import { useAppStore } from "@/store/store";
import Map, { Marker } from "react-map-gl";

const TOKEN = "pk.eyJ1IjoicGF1bC10ZXMiLCJhIjoiY2x3dGR3ODI1MDJiZDJscXpxMXBmNHQ2eiJ9.Yrd8qMv0zpu1sFGbT2zO4w";

export default function HomeMap() {
  const { currentListing } = useAppStore();
  const pins = useMemo(() => {
    return (
      <Marker
        longitude={JSON.parse(currentListing.mapData).longitude}
        latitude={JSON.parse(currentListing.mapData).latitude}
      >
        <Pin />
      </Marker>
    );
  }, [currentListing]);
  return (
    <div className="h-96 w-full">
      <Map
        initialViewState={{
          longitude: JSON.parse(currentListing.mapData).longitude,
          latitude: JSON.parse(currentListing.mapData).latitude,
          zoom: 11,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        {pins}
      </Map>
    </div>
  );
}
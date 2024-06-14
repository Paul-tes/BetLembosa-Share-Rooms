import React, {useMemo, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";

import { useAppStore } from "@/store/store";
import Pin from "../common/Pin";
import ListingCard from "../listingCard";

const TOKEN = "pk.eyJ1IjoicGF1bC10ZXMiLCJhIjoiY2x3dGR3ODI1MDJiZDJscXpxMXBmNHQ2eiJ9.Yrd8qMv0zpu1sFGbT2zO4w";

export default function MapView() {
  const [mapData, setMapData] = useState([]);
  const { listings } = useAppStore();

  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      listings.map((data, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={JSON.parse(data.mapData).longitude}
          latitude={JSON.parse(data.mapData).latitude}
          anchor="top"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        >
          <Pin />
        </Marker>
      )),
    [listings]
  );

  return (
    <div
      className="h-[71.5vh] max-w-[100vw] pt-2
    "
    >
      <Map
        initialViewState={{
          longitude: 72.5714,
          latitude: 23.0225,
          zoom: 11,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(JSON.parse(popupInfo.mapData).longitude)}
            latitude={Number(JSON.parse(popupInfo.mapData).latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <ListingCard data={popupInfo} />
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
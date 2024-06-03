import React from "react";

import Map from 'react-map-gl';

import GeocoderControl from './geocoder-control';
import ControlPanel from './control-panel';

// eslint-disable-next-line
const TOKEN = "pk.eyJ1IjoicGF1bC10ZXMiLCJhIjoiY2x3dGR3ODI1MDJiZDJscXpxMXBmNHQ2eiJ9.Yrd8qMv0zpu1sFGbT2zO4w"; // Set your mapbox token here

const PlaceLocation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <h2 className="font-semibold text-4xl">
        Which of these best describes your place?
      </h2>
      <p>
        Your address is only shared with guests after they’ve made a
        reservation.
      </p>
      <div className="h-[400px] w-[700px] ">
        <Map
          initialViewState={{
            longitude: -79.4512,
            latitude: 43.6568,
            zoom: 13
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
        >
          <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
        </Map>
        <ControlPanel />
      </div>
    </div>
  );
};

export default PlaceLocation;

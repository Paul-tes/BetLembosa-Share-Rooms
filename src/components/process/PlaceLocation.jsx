import React from "react";
import { useAppStore } from "@/store/store";

import Map from 'react-map-gl';
import GeocoderControl from './geocoder-control';

// eslint-disable-next-line
const TOKEN = "pk.eyJ1IjoicGF1bC10ZXMiLCJhIjoiY2x3dGR3ODI1MDJiZDJscXpxMXBmNHQ2eiJ9.Yrd8qMv0zpu1sFGbT2zO4w"; // Set your mapbox token here

const PlaceLocation = () => {
  const { setMapData, setLocationData, mapData, locationData } = useAppStore();
  const getResults = ({ result }) => {
    // extract longtiude and latitiude location of the the searched place.
    const [longitude, latitude] = result?.geometry?.coordinates;
    // prepare data to extract
    const data = {
      landmark: result.text,
      neighborhood: "",
      postcode: "",
      locality: "",
      place: "",
      district: "",
      region: "",
      country: "",
    };

    // search data with the key of [data] attributes in side the result.context array response.
    result?.context?.forEach((item) => {
      Object.keys(data)?.forEach((key) => {
        if (item?.id?.startsWith(key + ".")) {
          data[key] = item?.text;
        }
      });
    });
    // setting all map datas
    setMapData({ latitude, longitude });
    setLocationData({ ...data });
  };

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
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
        >
          <GeocoderControl
            mapboxAccessToken={TOKEN}
            position="top-left"
            marker={true}
            onLoading={() => {}}
            onResults={() => {}}
            onResult={getResults}
            onError={() => {}}
          />
        </Map>
      </div>
    </div>
  );
};

export default PlaceLocation;

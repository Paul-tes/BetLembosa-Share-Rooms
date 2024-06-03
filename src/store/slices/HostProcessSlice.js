export const createNewHostProcessSlice = (set, get) => ({
  homeType: undefined, // locatinType
  setHomeType: (homeType) => set({ homeType }),
  placeType: undefined,
  setPlaceType: (placeType) => set({ placeType }),
  mapData: undefined,
  setMapData: (mapData) => set({ mapData }),
  locationData: undefined,
  setLocationData: (locationData) => set({ locationData }),
});
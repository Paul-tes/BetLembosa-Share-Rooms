export const createNewHostProcessSlice = (set, get) => ({
  homeType: undefined, // locatinType
  setHomeType: (homeType) => set({ homeType }),
  placeType: undefined,
  setPlaceType: (placeType) => set({ placeType }),
  mapData: undefined,
  setMapData: (mapData) => set({ mapData }),
  locationData: undefined,
  setLocationData: (locationData) => set({ locationData }),
  placeSpace: { bathrooms: 1, beds: 1, guests: 2 },
  setPlaceSpace: (placeSpace) => set({ placeSpace }),
  placeAmeneites: [],
  setPlaceAmenities: (placeAmeneites) => set({ placeAmeneites }),
  photos: [],
  setPhotos: (photos) => set({ photos }),
});
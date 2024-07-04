export const createLisitingsSlice = (set, get) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  wishLists: [],
  setWishLists: (wishLists) => set({ wishLists }),
  wishListsPage: [],
  setWishListsPage: (wishListsPage) => set({ wishListsPage }),
  removeFromWishList: () => {},
  currentListing: undefined,
  setCurrentListing: (hostData) => {
    console.log("host Data in setCurrntListing on Slice", hostData);
    set({ currentListing: hostData });
  },
  removeUserListing: (listing) => {
    const listings = get().userListings;
    const index = listings.findIndex((list) => list.id === listing);
    if (index !== -1) {
      listings.splice(index, 1);
    }
    set({ userListings: listings });
  },
  isMapView: false,
  listings: [],
  showScheduleBar: false,
  userListings: [],
  setUserListings: (userListings) => set({ userListings }),
  setMapView: () => {
    set({ isMapView: !get().isMapView });
  },
  setInitialView: () => {
    set({ isMapView: false });
  },
  setListings: (listings) => {
    set({ listings });
  },
  setShowScheduleBar: () => {
    set({ showScheduleBar: !get().showScheduleBar });
  },
});
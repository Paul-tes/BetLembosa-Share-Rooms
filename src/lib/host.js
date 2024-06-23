import { createUrl, post, del, get } from "./http";
import QueryString from "qs";
import axios from "axios";


// create new host(home)
export const createHomeAPI = async (hostData) => {
  const result = (
    await post(createUrl("/api/v1/home/create"), {
      ...hostData,
    }).catch(() => null)
  );

  if (!result?.data) {
    return alert("Could not create Home");
  }

  return result;
};

// get all hosts
export const getAllHomes = async () => {
  const query =  QueryString.stringify({
    orderBy: { createdAt: "asc" },
  });

  const result = await get(createUrl(`/api/v1/home/getHomes?${query}`));

  if (!result) {
    alert("Could not get Homes");
    return [];
  }

  return result.data;
};

// get a single host(home)
export const getHome = async (homeId) => {
  const result = await axios.get(createUrl(`/api/v1/home/getHome?id=${homeId}`));
  if (!result) {
  }
  return result.data;
};


// get my own hosts
// user that creates thier hosts only.
export const getMyHosts = async () => {
  const result = await get(createUrl('/api/v1/home/GetMyHomes'));
  if (!result) {
    console.log("not found");
  }
  return result.data;
};

// delete list(host)
export const deleteListingAPI = async (id) => {
  const result = await del(createUrl(`/api/v1/home/delete?id=${id}`));
  if (!result) {
    console.log("cannot delete");
  }
  return result;
};

// get user wish lists
export const getUserWishlists = async () => {
  const result = (
    await get(createUrl(`/api/v1/wishlist/getMyLists`)).catch(() => null)
  )?.data;
  
  if (!result) {
    console.log("cannot fetch my wish lists");
  }

  return result;
};

// add wish list
export const addToWishList = async (homeId) => {
  const response = await axios.post(
    createUrl("/api/v1/wishlist/create"),
    { homeId },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response) {
    return alert("Could not create task");
  }

  return response;
};


// remove wish lists
export const removeFromWishList = async (homeId) => {
  const result = await del(
    createUrl(`/api/v1/wishlist/delete/${homeId}`));
  if (!result) {
    console.log("cannot delete");
  }
  return result;
};

export const addTrip = async (data) => {
  const query = {
    listing: {
      id: data.listingId,
    },
    user: { id: data.userId },
    tripData: data.tripData,
  };
  const result = await axios.post(createUrl("/api/trips"), { ...query });
  if (!result) {
    alert("failed");
  } else {
    return result;
  }
};
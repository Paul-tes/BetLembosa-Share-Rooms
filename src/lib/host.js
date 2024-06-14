import { createUrl, post } from "./http";
import QueryString from "qs";
import axios from "axios";

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

export const getAllHomes = async () => {
  const query =  QueryString.stringify({
    orderBy: { createdAt: "asc" },
  });

  const result = await axios.get(createUrl(`/api/v1/home/getHomes?${query}`));

  if (!result) {
    alert("Could not get Homes");
    return [];
  }

  return result.data;
};

// export const getListing = async (listingId) => {
//   const result = await axios.get(createUrl(`/api/listings/${listingId}`));
//   if (!result) {
//   }
//   return result.data;
// };

export const getMyHosts = async () => {
  const result = await axios.get(createUrl('/api/v1/home/GetMyHomes'));
  if (!result) {
    console.log("not found");
  }
  console.log({ result });
  return result.data;
};
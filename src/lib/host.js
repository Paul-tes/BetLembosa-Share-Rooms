import { createUrl, post, del, get } from "./http";
import QueryString from "qs";

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

  const result = await get(createUrl(`/api/v1/home/getHomes?${query}`));

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
  const result = await get(createUrl('/api/v1/home/GetMyHomes'));
  if (!result) {
    console.log("not found");
  }
  console.log({ result });
  return result.data;
};

export const deleteListingAPI = async (id) => {
  const result = await del(createUrl(`/api/v1/home/delete?id=${id}`));
  if (!result) {
    console.log("cannot delete");
  }
  return result;
};

// get user wish lists
export const getUserWishlists = async (userId) => {
  const query = qs.stringify({
    where: {
      user: { id: userId },
    },
    select: {
      listing: true,
    },
  });
  const result = (
    await axios.get(createUrl(`/api/wishlists?${query}`)).catch(() => null)
  )?.data;

  console.log({ result });
  return result;
};

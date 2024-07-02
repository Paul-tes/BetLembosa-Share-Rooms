import { createUrl, post, del, get, put } from "./http";
import QueryString from "qs";
import { loadStripe } from "@stripe/stripe-js";


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
  const result = await get(createUrl(`/api/v1/home/getHome?id=${homeId}`));
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
  const response = await post(
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


const PUBKEY = "pk_test_51PV7dAFeP1hmaHV3aolksEofh0xAQfiz6xZmm1v5KpKbpPOUOXtZYNUM5JL2OEwjnQfN4kY4awaq66XTt0kL5P9l00KtI34oXq"
export const addTrip = async (data) => {
  const stripe = await loadStripe(PUBKEY);

  const response = await post(
    createUrl("/api/v1/trip/create-checkout-session"),
    {
      ...data
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  
  
  const res = await response.data;
  console.log("Res data", res)

  localStorage.setItem("PaymentProcessId", res.tripId);

  const result = stripe.redirectToCheckout({
    sessionId:res.sessionId
  })


  // IF the payement goes error the code will not excute the above line.
  // If it's having error delete trip api will be called.
  if (result.error) {
    console.log("payement is not complated");X
  }
};

export const getUserTrips = async () => {

  const result = (
    await get(createUrl('/api/v1/trip/getAllTrips')).catch(() => null)
  )?.data;
  
  return result;
};


export const completeTripPayment = async (paymentId) => {
  console.log("Payement Process trigred: Id", paymentId);
  try {
    const result = await put(
      createUrl(`/api/v1/trip/updatePayment`),
      { 
        paid: true,
        id: paymentId,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return result;
  } catch (error) {
    console.error("Error completing payment:", error);
    return null;
  }
};
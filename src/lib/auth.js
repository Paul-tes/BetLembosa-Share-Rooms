import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./http";

export const me = async () => {
  return isStoredJwt()
    ? (await get(createUrl("/api/v1/account/me")).catch(() => null))?.data
    : null;
};


export const login = async (email, password) => {
  try {
    const response = await post(createUrl("/api/v1/account/login"), { email, password });
    const result = response.data;

    setStoredJwt(result.accessToken);
    return await me();
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      const { status, data } = error.response;
      if (status === 400 && data.errors) {
        throw new Error("Invalid input data");
      } else if (status === 401) {
        throw new Error(data);
      } else {
        throw new Error("An unknown error occurred");
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from the server");
    } else {
      // Something else happened in making the request
      throw new Error("An unknown error occurred");
    }
  }
};


export const signup = async (email, password, firstName, lastName) => {
  try {
    const response = await post(createUrl("/api/v1/account/register"), {
      email,
      password,
      firstName,
      lastName,
    });
    const result = response.data;

    setStoredJwt(result.accessToken);
    return await me();
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      const { status, data } = error.response;
      if (status === 400 && data.errors) {
        throw new Error("Invalid input data");
      } else if (status === 401) {
        throw new Error("Unauthorized access");
      } else if (status === 500) {
        if (data) {
          const errorMessage = data.errors ? data.errors.map(err => err.description).join(', ') : "Internal server error";
          throw new Error(errorMessage);
        } else {
          throw new Error("An unknown server error occurred");
        }
      } else {
        throw new Error("An unknown error occurred");
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from the server");
    } else {
      // Something else happened in making the request
      throw new Error("An unknown error occurred");
    }
  }
};

export const checkUser = async (email) => {
  const result = (
    await post(createUrl("/api/v1/account/check-user"), { email }).catch(() => null)
  )?.data;
  if (!result) return false;
  return true;
};

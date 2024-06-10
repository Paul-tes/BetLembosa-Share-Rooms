import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./http";

export const me = async () => {
  return isStoredJwt()
    ? (await get(createUrl("/api/v1/account/me")).catch(() => null))?.data
    : null;
};

export const login = async (email, password) => {
  const result = (
    await post(createUrl("/api/v1/account/login"), { email, password }).catch(
      () => null
    )
  )?.data;

  if (!result) {
    return alert("Could not login");
  }
  setStoredJwt(result.accessToken);
  return me();
};

export const signup = async (email, password, firstName, lastName) => {
  const result = (
    await post(createUrl("/api/v1/account/account/register"), {
      email,
      password,
      firstName,
      lastName,
    }).catch(() => null)
  )?.data;

  if (!result) {
    return alert("Could not sign up");
  }
  setStoredJwt(result.accessToken);
  return me();
};

export const checkUser = async (email) => {
  const result = (
    await post(createUrl("/api/v1/account/check-user"), { email }).catch(() => null)
  )?.data;
  if (!result) return false;
  return true;
};
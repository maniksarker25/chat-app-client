import { authKey } from "@/constants/auth";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { jwtDecode } from "jwt-decode";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  console.log(authToken);
  if (authToken) {
    const decodedInfo = jwtDecode(authToken);
    return decodedInfo;
  }
};

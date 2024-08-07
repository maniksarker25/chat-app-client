import { authKey } from "@/constants/auth";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { jwtDecode } from "jwt-decode";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedInfo: { id: string; email: string; iat: number; exp: number } =
      jwtDecode(authToken);
    return decodedInfo;
  }
};

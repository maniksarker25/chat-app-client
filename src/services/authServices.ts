import { authKey } from "@/constants/auth";
import { setToLocalStorage } from "@/utils/localStorage";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

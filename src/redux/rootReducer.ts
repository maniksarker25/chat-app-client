import { baseApi } from "./api/baseApi";
import userReducer from "./userSlice";
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
};

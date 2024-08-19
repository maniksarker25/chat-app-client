import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
interface UserState {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  token: string;
  // onlineUser: Array<string>;
  // socketConnection: any | null;
}

// Initial state
const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  // onlineUser: [],
  // socketConnection: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user details
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const { _id, name, email, profile_pic } = action.payload;
      if (_id) state._id = _id;
      if (name) state.name = name;
      if (email) state.email = email;
      if (profile_pic) state.profile_pic = profile_pic;
    },
    // Set token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Logout the user
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
      // state.socketConnection = null;
    },
    // Set online users
    // setOnlineUser: (state, action: PayloadAction<string[]>) => {
    //   state.onlineUser = action.payload;
    // },
    // Set socket connection
    // setSocketConnection: (state, action: PayloadAction<any | null>) => {
    //   state.socketConnection = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;

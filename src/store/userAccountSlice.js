import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  accessToken: "",
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setUser, setAccessToken, logout } = userAccountSlice.actions;
export default userAccountSlice.reducer;

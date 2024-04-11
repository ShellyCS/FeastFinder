import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: () => {
    try {
      const serializedState = localStorage.getItem("userLogginDetails");
      if (serializedState !== null) {
        return JSON.parse(serializedState);
      }
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
    }
    return {
      firstName: "",
      lastName: "",
      loggedIn: false,
      email: "",
      token: "",
    };
  },
  reducers: {
    loginUser: (state, { payload }) => {
      console.log({ payload });
      state = { ...payload };
      localStorage.setItem(
        "userLogginDetails",
        JSON.stringify({
          ...payload,
        })
      );
      return state;
    },
    logoutUser: (state, { payload }) => {
      state = {};
      localStorage.setItem(
        "userLogginDetails",
        JSON.stringify({
          ...payload,
        })
      );
      return state;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

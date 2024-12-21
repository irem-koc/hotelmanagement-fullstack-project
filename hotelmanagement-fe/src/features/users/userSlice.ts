import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  email: "",
  role: "",
  token: "",
  password: "",
};
const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    saveUserLoggedIn(state, action) {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.password = action.payload.password;
    },
  },
});

export const { saveUserLoggedIn } = usersSlice.actions;
export default usersSlice.reducer;

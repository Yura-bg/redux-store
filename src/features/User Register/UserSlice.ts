import { createSlice } from "@reduxjs/toolkit";
import { User } from "./type";
import { error } from "console";

const initialState: { users: User[] } = {
  users: [
    { id: 1, name: "Yura", surname: "Baghdasaryan", nickname: "Yur1" },
    { id: 2, name: "Artur", surname: "Poghosyan", nickname: "Art1" },
    { id: 3, name: "David", surname: "Grigoryan", nickname: "Dav1" },
    { id: 4, name: "Armen", surname: "Sargsyan", nickname: "Arm1" },
    { id: 5, name: "Narek", surname: "Ghazaryan", nickname: "NAr1" },
  ],
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const isIncluded = state.users.some(
        (user) => user.nickname === action.payload.nickname
      );

      if (isIncluded) {
        console.error("Nicname alredy exixst");
        return;
      }
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((elm) => elm.id !== action.payload);
    },
  
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

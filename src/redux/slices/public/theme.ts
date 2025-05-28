import { createSlice } from "@reduxjs/toolkit";

const initialState: string = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme")!)
  : "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,

  reducers: {
    changeTheme: (state: string) => {
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(newTheme));

      return newTheme;
    },
  },
});

export default themeSlice;

export const themeAction = themeSlice.actions;

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import themeSlice from "../slices/public/theme";

const rootReducer = combineReducers({
  // public slices
  theme: themeSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

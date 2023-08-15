import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;

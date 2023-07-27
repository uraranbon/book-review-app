import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./reducers";

const store = configureStore({
  reducer: {
    booksState: booksReducer,
  },
});

export default store;
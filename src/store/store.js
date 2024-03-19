import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userSlice from "./userData";
import flightSearchSlice from "./flightSearch";
import flightDetailsSlice from "./flightDetails";

const store = configureStore({
  reducer: {
    userData: persistReducer(
      {
        key: "userData",
        storage,
      },
      userSlice
    ),
    flightSearch: flightSearchSlice,
    flightDetails: flightDetailsSlice,
  },
  middleware: [thunk],
});
export default store;

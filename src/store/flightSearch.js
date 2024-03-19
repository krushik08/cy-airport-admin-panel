import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState: {},
  reducers: {
    setFlightSearch(state, action) {
      state.flightSearch = action.payload;
    },
  },
});
export const { setFlightSearch } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;

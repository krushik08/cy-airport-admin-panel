import { createSlice } from "@reduxjs/toolkit";

const flightDetailsSlice = createSlice({
  name: "flightDetails",
  initialState: {},
  reducers: {
    setFlightDetails(state, action) {
      state.flightDetails = action.payload;
    },
  },
});
export const { setFlightDetails } = flightDetailsSlice.actions;
export default flightDetailsSlice.reducer;

import {createSlice} from "@reduxjs/toolkit";

export const messages = createSlice({
   name: "messages",
   initialState: [],
   reducers: {
      set: (state, action) => action.payload
   }
});

export const {set} = messages.actions;

export default messages.reducer;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const messages = createSlice({
   name: "messages",
   initialState: [] as string[],
   reducers: {
      set: (state, action: PayloadAction<string[]>) => {
         return action.payload;
      }
   }
});

export const {set} = messages.actions;

export default messages.reducer;

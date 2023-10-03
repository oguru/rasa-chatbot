import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const botProcessing = createSlice({
   name: "botProcessing",
   initialState: false,
   reducers: {
      setProcessing: (_: any, action: PayloadAction<boolean>) => {
         return action.payload;
      }
   }
});

export const {setProcessing} = botProcessing.actions;

export default botProcessing.reducer;

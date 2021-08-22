import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
   name: "messages",
   initialState: [],
   reducers: {
      add: (state, action) => {
         state.push(action.payload);
      },
      remove: state => {
         state.shift();
      }
   }
});

export const {add, remove} = slice.actions;

export default slice.reducer;

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   name: ""
};

export const localUser = createSlice({
   name: "messages",
   initialState,
   reducers: {
      setLocalUser: (state, action) => {
         state.name = action.payload;
      }

   }
});

export const {setLocalUser} = localUser.actions;

export default localUser.reducer;

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   name: ""
};

export const localUser = createSlice({
   name: "localUser",
   initialState,
   reducers: {
      setLocalUser: (state, action) => {
         state.name = action.payload;
      }

   }
});

export const {setLocalUser} = localUser.actions;

export default localUser.reducer;

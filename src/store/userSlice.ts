import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LocalUserState {
   name: string;
};

const initialState: LocalUserState = {
   name: ""
};

export const localUser = createSlice({
   name: "localUser",
   initialState,
   reducers: {
      setLocalUser: (state, action: PayloadAction<string>) => {
         state.name = action.payload;
      }

   }
});

export const {setLocalUser} = localUser.actions;

export default localUser.reducer;

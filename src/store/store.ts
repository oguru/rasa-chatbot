import {configureStore} from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";

const store = configureStore({
   reducer: {
      messages: messagesReducer,
      user: userReducer
   }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
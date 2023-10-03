import {configureStore} from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";
import botProcessingReducer from "./botProcessingSlice";

const store = configureStore({
   reducer: {
      messages: messagesReducer,
      user: userReducer,
      botProcessing: botProcessingReducer
   }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
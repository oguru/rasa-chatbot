import { combineReducers } from "redux";
import messageReducer from "./messagesReducer";

//takes key: value pair
const reducers = combineReducers({
    messages: messageReducer
})

export default reducers;
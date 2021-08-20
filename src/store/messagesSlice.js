import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        add: (state, action) => {
            state.messages.push(action.payload);
        },
        remove: state => {
            state.messages.shift();
        }
    }
})

export const {add, remove} = slice.actions;

export const removeAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(remove());
    }, 5000);
};

export default slice.reducer;

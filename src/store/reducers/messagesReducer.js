//takes 2 args - initial state and action
const reducer = (state = [], action) => {
    switch (action.type) {
        case "add":
            return [...state].push(action.payload);
        // case "transition":
            // return state
        case "remove":
            return [...state].shift();
        default:
            return state;
    }
}

export default reducer;
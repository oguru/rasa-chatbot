export const addMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: "addMessage",
            payload: message
        })
    }
}

export const removeMessage = () => {
    return (dispatch) => {
        dispatch({
            type: "removeMessage"
        })
    }
}
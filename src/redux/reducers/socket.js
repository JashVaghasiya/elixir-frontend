
export const socketReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_SOCKET':
            return action.payload
        case 'UNSET_SOCKET':
            return action.payload
        default:
            return state
    }
}
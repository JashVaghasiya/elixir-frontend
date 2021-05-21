export const roomReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            return action.payload
        case 'UNSET_ROOM':
            return action.payload
        default:
            return state
    }
}
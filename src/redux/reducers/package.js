
export const packageReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_PACKAGE':
            return action.payload
        case 'UNSET_PACKAGE':
            return action.payload
        default:
            return state
    }
}

export const orderReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ORDER':
            return action.payload
        case 'UNSET_ORDER':
            return action.payload
        default:
            return state
    }
}
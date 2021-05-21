export const doctorReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_DOCTOR':
            return action.payload
        case 'LOGOUT_DOCTOR':
            return action.payload
        default:
            return state
    }
}
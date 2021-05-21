
export const adsReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ADS_AMOUNT':
            return action.payload
        case 'UNSET_ADS_AMOUNT':
            return action.payload
        default:
            return state
    }
}
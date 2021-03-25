
export const sellerProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELLER_PRODUCTS':
            return action.payload
        case 'CREATE_SELLER_PRODUCT':
            return action.payload
        case 'UPDATE_SELLER_PRODUCT':
            return action.payload
        case 'DELETE_SELLER_PRODUCT':
            return action.payload
        default:
            return state
    }
}
import { combineReducers } from 'redux'
import { sellerProductReducer } from './reducers/product'
import { packageReducer, sellerReducer } from './reducers/seller'
import { userReducer } from './reducers/user'

export const rootReducer = combineReducers({
    user: userReducer,
    seller: sellerReducer,
    sellerProduct: sellerProductReducer,
    package: packageReducer
})
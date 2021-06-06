import { combineReducers } from 'redux'
import { userReducer } from './reducers/user'
import { orderReducer } from './reducers/order'
import { adsReducer } from './reducers/ads'
import { packageReducer } from './reducers/package'
import { doctorReducer } from './reducers/doctor'
import { roomReducer } from './reducers/room'
import { socketReducer } from "./reducers/socket"
import { sellerReducer } from "./reducers/seller"
export const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    ads: adsReducer,
    package: packageReducer,
    doctor: doctorReducer,
    room: roomReducer,
    socket: socketReducer,
    seller: sellerReducer,
})
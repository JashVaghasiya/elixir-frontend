import axios from 'axios'

export const createPaymentIntent = async (packageAmount) => {
    return await axios.post(`http://localhost:8000/api/payment/package`, { packageAmount })
}

export const createOrderPayment = async (authtoken, orderAmount) => {

    return await axios.post(`http://localhost:8000/api/payment/cart`, { orderAmount }, {
        headers: { authtoken: authtoken }
    })
}

export const createAdsPayment = async (authtoken, adsAmount) => {

    return await axios.post(`http://localhost:8000/api/payment/ads`, { adsAmount }, {
        headers: { authtoken: authtoken }
    })
}



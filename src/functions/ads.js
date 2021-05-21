import axios from 'axios'

export const getAds = (limits, pageNumber, sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/ads?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSellerAds = (limits, pageNumber, sortName, manner, sellerId, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/ads/${sellerId}?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}


export const createAd = (productId, sellerId, days, amountPaid, authtoken) => {
    return axios.post(`http://localhost:8000/api/seller/ads`, { productId, sellerId, days, amountPaid },
        {
            headers: {
                authtoken: authtoken
            }
        })
}

export const checkForAds = (productId, sellerId, authtoken) => {
    return axios.post(`http://localhost:8000/api/seller/check/ads`, { productId, sellerId },
        {
            headers: {
                authtoken: authtoken
            }
        })
}



export const updateAdsRate = (rate, authtoken) => {
    console.log(rate)
    return axios.put(`http://localhost:8000/api/admin/ads`, { rate },
        {
            headers: {
                authtoken: authtoken
            }
        })
}


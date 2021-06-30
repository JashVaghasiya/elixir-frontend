import axios from 'axios'

export const getUserCount = (authtoken) => {
    return axios.get('http://localhost:8000/api/admin/user/count', {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getProductCount = (authtoken) => {
    return axios.get('http://localhost:8000/api/admin/product/count', {
        headers: {
            authtoken: authtoken
        }
    })
}
export const getLocationCount = (authtoken) => {
    return axios.get('http://localhost:8000/api/admin/location/count', {
        headers: {
            authtoken: authtoken
        }
    })
}
export const getOrderCount = (authtoken) => {
    return axios.get('http://localhost:8000/api/admin/order/count', {
        headers: {
            authtoken: authtoken
        }
    })
}
export const getOtherCount = (authtoken) => {
    return axios.get('http://localhost:8000/api/admin/other/count', {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getCardDetails = (authtoken) => {
    return axios.get('http://localhost:8000/api/admin/card/count', {
        headers: {
            authtoken: authtoken
        }
    })
}

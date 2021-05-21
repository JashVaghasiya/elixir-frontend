import axios from 'axios'

export const getOrders = (limits, pageNumber, sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/orders?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const createOrder = (cart, qty, discountedAmount, taxAmount, shippingCharges, payableAmount, couponId, address, userId, authtoken, transactionId, downloadURL) => {
    return axios.post(`http://localhost:8000/api/order`, { cart, qty, discountedAmount, taxAmount, shippingCharges, payableAmount, couponId, address, userId, transactionId, downloadURL }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSellerOrders = (limits, pageNumber, sortName, manner, sellerId, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/order/${sellerId}?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getUserOrder = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/get/order/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getDetailOrder = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/get/detail/order/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getUnscheduledOrders = (limits, pageNumber, sortName, manner, sellerId, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/order/unscheduled/${sellerId}?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}
export const setOrderPickUp = (id, date, authtoken) => {
    console.log(date)
    return axios.put(`http://localhost:8000/api/seller/order/${id}`, { date }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getAgencyOrders = (status, limit, pageNumber, sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/agency/order?status=${status}&pageSize=${limit}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getAgencyDetailOrders = (limit, pageNumber, sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/agency/order/detail?pageSize=${limit}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getDetailOfOrder = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/agency/order/detail/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getOrder = async (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/order/${id}/invoice`, {
        headers: {
            authtoken: authtoken
        }
    })
}
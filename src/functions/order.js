import axios from 'axios'

export const getOrders = (limits, pageNumber, sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/orders?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const createOrder = (cart, qty, amount, userId, authtoken) => {
    return axios.post(`http://localhost:8000/api/order`, { cart, qty, amount, userId }, {
        headers: {
            authtoken: authtoken
        }
    })
}


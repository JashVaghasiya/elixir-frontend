import axios from 'axios'

export const createComplain = async (orderId, productName, complain, userId, authtoken) => {
    return await axios.post("http://localhost:8000/api/user/complain", { orderId, productName, complain, userId }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const listComplains = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/list/complain/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getAllComplain = async (authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/complains`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getItSolved = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/complain/solve`, { id }, {
        headers: {
            authtoken: authtoken
        }
    })
}
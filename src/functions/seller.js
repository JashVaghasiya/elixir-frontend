import axios from 'axios'

export const createSeller = async (data) => {
    return await axios.post('http://localhost:8000/api/seller/verify', { data })
}

export const getSeller = async (limits, pageNumber, sortName, manner, authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/seller?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}
import axios from 'axios'

export const createSeller = async (data, pack, authtoken) => {
    console.log(pack)
    return await axios.post('http://localhost:8000/api/seller/verify', { data, pack }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateSellerPackage = async (id, pack, authtoken) => {
    return await axios.put('http://localhost:8000/api/seller/renew', { id, pack }, {
        headers: {
            authtoken: authtoken
        }
    })
}


export const updateSellerProfile = async (data, authtoken) => {
    return await axios.put(`http://localhost:8000/api/seller/update/profile/${data.id}`, { data }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSingleSeller = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/seller/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSellerProfile = async (id, authtoken) => {
    console.log(id, authtoken)
    return await axios.get(`http://localhost:8000/api/seller/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSellerOrder = async (id) => {
    return await axios.get(`http://localhost:8000/api/seller/dashboard/${id}`)
}

export const getSeller = async (limits, pageNumber, sortName, manner, authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/seller?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}



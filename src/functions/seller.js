import axios from 'axios'

export const createSeller = async (data) => {
    return await axios.post('http://localhost:8000/api/seller/verify', { data })
}

export const getSeller = async (authtoken) => {
    return await axios.get('http://localhost:8000/api/admin/seller', {
        headers: {
            authtoken: authtoken
        }
    })
}
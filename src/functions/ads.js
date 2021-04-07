import axios from 'axios'

export const getAds = (limits, pageNumber, sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/ads?pageSize=${limits}&sortName=${sortName}&manner=${manner}&pageNumber=${pageNumber}`, {
        headers: {
            authtoken: authtoken
        }
    })
}
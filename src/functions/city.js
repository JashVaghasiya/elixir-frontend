import axios from 'axios'

export const createCity = async (state, name, authtoken) => {
    return axios.post('http://localhost:8000/api/city', { state, name }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateCity = async (id, state, name, authtoken) => {
    console.log("Update :", authtoken);
    return axios.put(`http://localhost:8000/api/city/${id}`, { state, name }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deleteCity = async (id, authtoken) => {
    return axios.delete(`http://localhost:8000/api/city/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getCity = async (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/city/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getCities = async () => {
    return axios.get(`http://localhost:8000/api/city`)
}

export const getCitiesOfState = async (id) => {
    return axios.get(`http://localhost:8000/api/city/${id}/state`)
}

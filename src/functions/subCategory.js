import axios from 'axios'

export const createSub = async (category, name, authtoken) => {
    return axios.post('http://localhost:8000/api/sub', { category, name }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateSub = async (id, category, name, authtoken) => {
    return axios.put(`http://localhost:8000/api/sub/${id}`, { category, name }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deleteSub = async (id, authtoken) => {
    return axios.delete(`http://localhost:8000/api/sub/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSub = async (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/sub/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getSubs = async () => {
    return axios.get(`http://localhost:8000/api/sub`)
}

export const getSubsOfCategory = async (id) => {
    return axios.get(`http://localhost:8000/api/sub/${id}/category`)
}

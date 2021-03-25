import axios from 'axios'

export const createState = async (name, authtoken) => {
    return await axios.post('http://localhost:8000/api/state', { name }, {
        headers:
            { authtoken: authtoken }
    })
}

export const deleteState = async (stateId, authtoken) => {

    return await axios.delete(`http://localhost:8000/api/state/${stateId}`, {
        headers: { authtoken: authtoken }
    })
}

export const updateState = async (id, name, authtoken) => {
    return await axios.put(`http://localhost:8000/api/state/${id}`, { name }, {
        headers:
            { authtoken: authtoken }
    })
}

export const getStates = async () => {
    return await axios.get('http://localhost:8000/api/state')
}

export const getState = async (id, authtoken) => {
    console.log(id, authtoken);
    return await axios.get(`http://localhost:8000/api/state/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}
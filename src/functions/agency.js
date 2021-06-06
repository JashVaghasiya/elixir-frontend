import axios from 'axios'

export const getAgencies = (authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/agency`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const setPicked = (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/agency/order/picked/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const manageOrder = (id, status, authtoken) => {
    return axios.put(`http://localhost:8000/api/agency/order/${id}`, { status }, {
        headers: {
            authtoken: authtoken
        }
    })
}

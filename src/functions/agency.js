import axios from 'axios'

export const getAgencies = (sortName, manner, authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/agency?sortName=${sortName}&manner=${manner}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const manageAgency = (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/admin/agency/manage/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateAgency = (id, agency, authtoken) => {
    return axios.put(`http://localhost:8000/api/admin/agency/${id}`, agency, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deleteAgency = (id, authtoken) => {
    return axios.delete(`http://localhost:8000/api/admin/agency/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getAgency = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/agency/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const createAgency = (agency, authtoken) => {
    return axios.post(`http://localhost:8000/api/admin/agency`, agency, {
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

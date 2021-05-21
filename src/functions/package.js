import axios from 'axios'

//common
export const getPackages = async () => {
    return await axios.get(`http://localhost:8000/api/package`)
}

export const createPackage = async (pack, authtoken) => {
    return await axios.post(`http://localhost:8000/api/admin/package`, { pack }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updatePackage = async (id, pack, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/package/${id}`, { pack }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deletePackage = async (id, authtoken) => {
    return await axios.delete(`http://localhost:8000/api/admin/package/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getPackage = async (id, authtoken) => {
    console.log(id, authtoken)
    return await axios.get(`http://localhost:8000/api/admin/package/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getPack = async (id) => {
    return await axios.get(`http://localhost:8000/api/seller/package/${id}`)
}

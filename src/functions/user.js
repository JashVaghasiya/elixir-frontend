import axios from 'axios'

export const createUser = async (authtoken) => {
    return await axios.post('http://localhost:8000/api/user/register', {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const createSeller = async (packageData, authtoken) => {
    return await axios.post('http://localhost:8000/api/user/register', { packageData }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateUser = async (userName, userMobile, userId, authtoken) => {
    return await axios.post('http://localhost:8000/api/user/update', { userName, userMobile, userId }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getAddress = async (authtoken, id) => {
    return await axios.get(`http://localhost:8000/api/user/address/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getUserProfile = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/get/profile/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}


export const findUser = async (authtoken) => {
    return await axios.post('http://localhost:8000/api/user/login', {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getCurrentUser = async (authtoken) => {
    return await axios.get('http://localhost:8000/api/current/user', {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getUsers = async (limits, pageNumber, sortName, manner, authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/users?pageSize=${limits}&pageNumber=${pageNumber}&sortName=${sortName}&manner=${manner}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deactivateUser = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/deactivate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const activateUser = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/activate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getCount = async () => {
    return await axios.get(`http://localhost:8000/api/user/footer/count`)
}

export const roleBasedRedirect = (history, user) => {
    const role = user.role
    console.log(role)
    if (role === 'admin') {
        history.push('/admin/dashboard')
    } else if (role === 'seller') {
        history.push('/seller/dashboard')
    } else if (role === 'agency') {
        history.push('/agency/1')
    } else if (role === 'user') {
        history.push('/')
    } else if (role === 'doctor') {
        history.push('/chat')
    } else {
        history.push('/')
    }
}
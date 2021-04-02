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


export const findUser = async (authtoken) => {
    return await axios.post('http://localhost:8000/api/user/login', {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getCurrentUser = async (authtoken) => {
    return await axios.post('http://localhost:8000/api/current-user', {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

// add to cart
// user._id, product._id, quantity, product.price, user.token
export const addToCart = async (userId, productId, qty, authtoken) => {
    return await axios.post(`http://localhost:8000/api/user/cart/add`, { userId, productId, qty }, {
        headers: {
            authtoken: authtoken
        }
    })
}

//add to wishlist

export const addToWishlist = async (id, productId, authtoken) => {
    return await axios.put(`http://localhost:8000/api/user/wishlist/add`, { id, productId }, {
        headers: {
            authtoken: authtoken
        }
    })
}


export const listWishlist = async (authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/wishlist`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const listCart = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/cart/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getUsers = async (authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/users`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deactivateUser = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/user/deactivate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const activateUser = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/user/activate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const roleBasedRedirect = (history, user) => {
    const role = user.role
    if (role === 'admin') {
        history.push('/admin/dashboard')
    } else if (role === 'seller') {
        history.push('/seller/dashboard')
    } else {
        history.push('/user/profile')
    }
}
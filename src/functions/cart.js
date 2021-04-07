import axios from 'axios'

export const listCart = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/user/cart/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const removeFromCart = async (productId, authtoken) => {
    return await axios.delete(`http://localhost:8000/api/user/cart/${productId}`, {
        headers: { authtoken: authtoken }
    })
}

export const updateProductQty = async (cartId, qty, authtoken) => {
    return await axios.put(`http://localhost:8000/api/user/cart/update`, { cartId, qty }, {
        headers: { authtoken: authtoken }
    })
}

export const addToCart = async (userId, productId, qty, authtoken) => {
    return await axios.post(`http://localhost:8000/api/user/cart/add`, { userId, productId, qty }, {
        headers: {
            authtoken: authtoken
        }
    })
}
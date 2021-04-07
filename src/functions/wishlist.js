import axios from 'axios'

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

export const removeWishlist = async (id, userId, authtoken) => {
    console.log(id, userId, authtoken)
    return await axios.put(`http://localhost:8000/api/user/wishlist/${id}`, { userId }, {
        headers: {
            authtoken: authtoken,
        }
    })
}
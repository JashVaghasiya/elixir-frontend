import axios from 'axios'

//common
export const getProducts = async () => {
    return await axios.get(`http://localhost:8000/api/products`)
}


//seller calling
export const getProduct = async (id) => {
    return await axios.get(`http://localhost:8000/api/product/${id}`)
}

export const getSellerProducts = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/product/${id}`, {
        headers: { authtoken: authtoken }
    })
}

export const getActiveProducts = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/product/${id}/active`, {
        headers: { authtoken: authtoken }
    })
}
export const getDeactivatedProducts = (id, authtoken) => {
    console.log(authtoken);
    return axios.get(`http://localhost:8000/api/seller/product/${id}/deactivated`, {
        headers: { authtoken: authtoken }
    })
}

export const getSellerRejectedProduct = (id, authtoken) => {
    console.log(id, authtoken)
    return axios.get(`http://localhost:8000/api/seller/product/rejected/${id}`, {
        headers: { authtoken: authtoken }
    })
}

export const createProduct = (product, authtoken) => {
    return axios.post('http://localhost:8000/api/seller/product', { product }, {
        headers: { authtoken: authtoken }
    })
}

export const updateProduct = (id, product, authtoken) => {
    return axios.put(`http://localhost:8000/api/seller/product/${id}`, { product }, {
        headers: { authtoken: authtoken }
    })
}

export const deleteProduct = async (id, authtoken) => {
    return axios.delete(`http://localhost:8000/api/seller/product/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}
export const activateProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/seller/product/activate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const deactivateProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/seller/product/deactivate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

//admin calling
export const getUnapprovedProduct = async (authtoken) => {
    return axios.get(`http://localhost:8000/api/admin/product/approve`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const approveProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/admin/product/approve/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const rejectProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/admin/product/reject/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}









import axios from 'axios'

//common
export const getProducts = async () => {
    return await axios.get(`http://localhost:8000/api/products`)
}


//seller calling
export const getProduct = async (id) => {
    return await axios.get(`http://localhost:8000/api/product/${id}`)
}


//get specific seller products
export const getSellerProducts = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/product/${id}`, {
        headers: { authtoken: authtoken }
    })
}

//particular product for ads
export const getAdsProduct = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/ads/product/${id}`, {
        headers: { authtoken: authtoken }
    })
}


//get activated products fro seller
export const getActiveProducts = (id, authtoken) => {
    return axios.get(`http://localhost:8000/api/seller/product/${id}/active`, {
        headers: { authtoken: authtoken }
    })
}

//get deactivate products for seller
export const getDeactivatedProducts = (id, authtoken) => {
    console.log(authtoken);
    return axios.get(`http://localhost:8000/api/seller/product/${id}/deactivated`, {
        headers: { authtoken: authtoken }
    })
}

//get rejected products fro seller
export const getRejectedProduct = (id, authtoken) => {
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

//activate product for seller
export const activateProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/seller/product/activate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

//deactivate products for seller
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

//approve product
export const approveProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/admin/product/approve/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}

//reject product
export const rejectProduct = async (id, authtoken) => {
    return axios.put(`http://localhost:8000/api/admin/product/reject/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}


//home page calling
export const getHomePageProducts = async (pageNumber) => {
    return axios.get(`http://localhost:8000/api/home/products?pageNumber=${pageNumber}`)
}

export const getFilteredProducts = async (filters) => {
    return axios.post(`http://localhost:8000/api/products/filter`, { filters })
}

export const getSearchedProducts = async (text) => {
    return axios.post(`http://localhost:8000/api/products/search`, { text })
}

export const getTopRated = async () => {
    return axios.get(`http://localhost:8000/api/products/top/rated`)
}

export const getTopGrossing = async () => {
    return axios.get(`http://localhost:8000/api/products/top/grossing`)
}

export const getTopFeatured = async () => {
    return axios.get(`http://localhost:8000/api/products/top/ads`)
}

export const getCategoryViseProduct = async (category) => {
    return axios.get(`http://localhost:8000/api/product/category/${category}`)
}

export const getSubCategoryViseProduct = async (sub) => {
    return axios.get(`http://localhost:8000/api/product/subcategory/${sub}`)
}

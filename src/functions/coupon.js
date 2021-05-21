import axios from 'axios'

export const getCoupons = async (authtoken) => {
    return await axios.get(`http://localhost:8000/api/coupon`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const createCoupon = async (name, discount, expiresAt, authtoken) => {
    return await axios.post('http://localhost:8000/api/coupon', { name, discount, expiresAt }, {
        headers:
            { authtoken: authtoken }
    })
}

export const deleteCoupon = async (id, authtoken) => {
    return await axios.delete(`http://localhost:8000/api/coupon/${id}`, {
        headers:
            { authtoken: authtoken }
    })
}

export const getCoupon = async (name, authtoken) => {
    return await axios.get(`http://localhost:8000/api/coupon/${name}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateCoupon = async (id, name, discount, expiresAt, authtoken) => {
    return await axios.put(`http://localhost:8000/api/coupon/${id}`, { name, discount, expiresAt }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const applyCoupon = async (couponId, userId, authtoken) => {
    return await axios.post('http://localhost:8000/api/coupon/apply', { couponId, userId }, {
        headers: {
            authtoken: authtoken
        }
    })
}
import axios from 'axios'

export const addReview = (rating, comment, user, productId, authtoken) => {
    return axios.post("http://localhost:8000/api/user/review", { rating, comment, user, productId }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getReviews = (id) => {
    return axios.get(`http://localhost:8000/api/product/review/${id}`)
}


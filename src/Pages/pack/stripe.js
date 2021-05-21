import axios from 'axios'

const stripe = (authtoken) => {
    axios.post(`http://localhost:3000/create-payment-intent`, {}, {
        headers: { authtoken: authtoken }
    })
}

export default stripe

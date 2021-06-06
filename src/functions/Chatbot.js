import axios from 'axios'

export const textQuery = async (text) => {
    return axios.post('http://localhost:8000/api/dialogflow/text', { text })
}

export const eventQuery = async (event) => {
    return axios.post('http://localhost:8000/api/dialogflow/event', { event })
}
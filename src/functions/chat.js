import axios from 'axios'

export const createMessage = async (message, room) => {
    console.log(message, room);
    return await axios.post("http://localhost:5001/api/chat/send", { message, room })
}

export const getMessages = async (roomId) => {
    console.log(roomId)
    return await axios.get(`http://localhost:5001/api/chat/${roomId}`)
}

export const getDoctors = async () => {
    return await axios.get(`http://localhost:5001/api/doctors`)
}

export const setUserConnection = async (sender, receiver, name, room) => {
    return await axios.post(`http://localhost:5001/api/chat/connect/user`, { sender, receiver, name, room })
}

export const getAllContacts = async (id) => {
    return await axios.get(`http://localhost:5001/api/doctors/${id}`)
}
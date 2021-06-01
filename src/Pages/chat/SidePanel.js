import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctors, getAllContacts, setUserConnection } from '../../functions/chat'
import './css/chat.css'

const SidePanel = ({ socket }) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [contacts, setContacts] = useState([])
    const [searchDoctors, setSearchDoctors] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [users, setUsers] = useState([])
    const [sender, setSender] = useState(null)
    const [previous, setPrevious] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setSender(user && user._id)
        socket && socket.on("addedUser", (data) => {
            console.log("User connected to room" + data);
        })
        socket && socket.on("addedDoctor", (data) => {
            console.log("Doctor connected to room" + data);
        })
    }, [user, socket, sender])


    useEffect(() => {
        setLoading(true)
        if (user && user.role === "user") {
            getDoctors().then(res => {
                setContacts(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err);
            })
        }
        if (user && user.role === "doctor") {
            getAllContacts(user._id).then(res => {
                setUsers(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }

    }, [user])


    const setActiveUser = async (roomId, doctorId, id, name) => {
        previous && document.getElementById(`${previous}`).classList.remove("active")
        document.getElementById(`${id}`).classList.add("active")
        setPrevious(id)
        dispatch({
            type: "SET_ROOM",
            payload: { roomId: roomId, receiver: id, receiverName: name }
        })
        await socket && socket.emit("addDoctor", roomId, doctorId)
    }

    const setActiveDoctor = async (id, name) => {
        previous && document.getElementById(`${previous}`).classList.remove("active")
        document.getElementById(`${id}`).classList.add("active")
        setPrevious(id)
        if (sender !== null) {
            dispatch({
                type: "SET_ROOM",
                payload: { roomId: `${sender}-room-${id}`, receiver: id, receiverName: name }
            })
            await socket && socket.emit("addUser", sender, `${sender}-room-${id}`)
            await setUserConnection(sender, id, user && user.name, `${sender}-room-${id}`)
        }

    }

    const searchContact = async (e) => {
        const regex = new RegExp(e.target.value, 'ig')

        if (users && users.length > 0) {
            const searchResult = users.reduce((acc, m) => {
                if (m.userName.match(regex)) {
                    acc.push(m)
                }
                return acc
            }, [])
            setSearchUsers(searchResult)
        } else {
            const searchResult = contacts.reduce((acc, m) => {
                if (m.name.match(regex)) {
                    acc.push(m)
                }
                return acc
            }, [])
            setSearchDoctors(searchResult)
        }
    }

    return (

        <div id="sidepanel">
            <div id="search">
                <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" placeholder="Search contacts..." onChange={e => searchContact(e)} />
            </div>
            <div id="contacts">
                <ul>
                    {/* For Users */}
                    {searchDoctors && searchDoctors.length > 0 ? (
                        loading ? "Loading..." : searchDoctors && searchDoctors.length > 0 && searchDoctors.map(contact => (
                            <li id={contact._id} class="contact" key={contact._id} onClick={() => setActiveDoctor(contact._id, contact.name)}>
                                <div class="wrap">
                                    <img src={contact.profileUrl === null ? "http://emilcarlsson.se/assets/louislitt.png" : contact.profileUrl} alt="" />
                                    <div class="meta">
                                        <p class="name">Dr. {contact.name}</p>
                                        <p class="preview">{contact.degree} ({contact.specialization})</p>
                                    </div>
                                </div>
                            </li>

                        ))) : (loading ? "Loading..." : contacts && contacts.length > 0 && contacts.map(contact => (
                            <li id={contact._id} class="contact" key={contact._id} onClick={() => setActiveDoctor(contact._id, contact.name)}>
                                <div class="wrap">
                                    <img src={contact.profileUrl === null ? "http://emilcarlsson.se/assets/louislitt.png" : contact.profileUrl} alt="" />
                                    <div class="meta">
                                        <p class="name">Dr. {contact.name}</p>
                                        <p class="preview">{contact.degree} ({contact.specialization})</p>
                                    </div>
                                </div>
                            </li>
                        )))}
                    {/* For Doctor */}
                    {searchUsers && searchUsers.length > 0 ? (
                        searchUsers && searchUsers.length > 0 && searchUsers.map(contact => (
                            <li id={contact._id} class="contact" key={contact._id} onClick={() => setActiveUser(contact.roomId, contact.doctorId, contact._id, contact.userName)}>
                                <div class="wrap">
                                    <div class="meta">
                                        <p class="name">{(contact.userName).toUpperCase()}</p>
                                        <p class="preview"></p>
                                    </div>
                                </div>
                            </li>

                        ))) : (users && users.length > 0 && users.map(contact => (
                            <li id={contact._id} class="contact" key={contact._id} onClick={() => setActiveUser(contact.roomId, contact.doctorId, contact._id, contact.userName)}>
                                <div class="wrap">
                                    <div class="meta">
                                        <p class="name">{(contact.userName).toUpperCase()}</p>
                                        <p class="preview"></p>
                                    </div>
                                </div>
                            </li>
                        )))}
                </ul>
            </div>

        </div>
    )
}

export default SidePanel

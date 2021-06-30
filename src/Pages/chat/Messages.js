import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleImage from '../../components/SingleImage'
import { createMessage, getMessages } from '../../functions/chat'
import { Image } from 'antd'
import './css/chat.css'
import Loader from '../../components/Loader'

const Messages = ({ socket }) => {

    const user = useSelector(state => state.user)
    const room = useSelector(state => state.room)
    const [messages, setMessages] = useState([])
    const [file, setFile] = useState()
    const [text, setText] = useState("")
    const [uploaded, setUploaded] = useState(true)
    const [loading, setLoading] = useState(false)
    const messRef = useRef(null)

    useEffect(() => {
        socket && socket.on('updateChat', data => {
            setMessages(messages => [...messages, data])
        })
    }, [socket])

    useEffect(() => {
        setMessages([])
        setLoading(true)
        getMessages(room && room.roomId).then(res => {
            setLoading(false)
            setMessages(res.data)

        }).catch(err => {
            console.log(err)
        })
    }, [room, room.roomId])

    // messRef.current && messRef.current.scrollIntoView({ behavior: "smooth" })

    const createChat = async () => {
        try {
            const message = { message: text, sender: user._id, senderName: user.name, receiver: room.receiver, receiverName: room.receiverName }
            room && await socket.emit("sendChat", message, room.roomId)
            await createMessage(message, room.roomId)

        } catch (err) {
            console.log(err)
        }
        setText("")
    }

    const sendMessage = e => {
        if (e.key === 'Enter') {
            createChat()
        }
    }

    const sendFile = async (file) => {
        setUploaded(true)
        setFile(file[0])

    }

    return (
        <div class="content">
            {file && <SingleImage file={file} user={user && user} room={room && room} createMessage={createMessage} socket={socket} uploaded={uploaded} setUploaded={setUploaded} />}
            <div class="contact-profile">
                <p style={{ margin: "0px", fontWeight: "600" }} className="ml-3">{room && (room.receiverName).toUpperCase()}</p>
            </div>
            <div id="mess" class="messages">
                {loading ? <Loader variant="white" /> :
                    <ul>
                        {(messages && messages.length > 0 && messages.map((m, index) => (
                            m.message.startsWith('https://firebasestorage.googleapis.com') ?
                                <li key={index} className={m.sender === user._id ? "sent" : "replies"}>
                                    <Image style={{ height: "250px" }} src={m.message} alt={m.message} />
                                </li>
                                :
                                <li key={index} className={m.sender === user._id ? "sent" : "replies"}>
                                    <p>{m.message}</p>
                                </li>
                        )))}

                    </ul>
                }
                <li ref={messRef}></li>
            </div>
            <div class="message-input">
                <div class="wrap">
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Write your message..." onKeyDown={e => sendMessage(e)} />
                    <label>
                        <input type="file" id="upload" hidden onChange={(e) => sendFile(e.target.files)} />
                        <label class="fa fa-paperclip attachment" for="upload" aria-hidden="true">
                        </label>
                    </label>
                    <button class="submit" onClick={() => createChat()}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    )
}
export default Messages

// {m.sender.id === user && user._id ? "sent" : "replies"}
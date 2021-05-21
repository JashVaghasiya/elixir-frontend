import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleImage from '../../components/SingleImage'
import { createMessage, getMessages } from '../../functions/chat'
import { Image } from 'antd'
import './css/chat.css'

const Messages = ({ socket }) => {

    const user = useSelector(state => state.user)
    const room = useSelector(state => state.room)
    const [messages, setMessages] = useState([])
    const [file, setFile] = useState()
    const [text, setText] = useState("")
    const [uploaded, setUploaded] = useState(true)

    useEffect(() => {
        socket && socket.on('updateChat', data => {
            setMessages(messages => [...messages, data])
        })
    }, [socket])

    useEffect(() => {
        setMessages([])
        getMessages(room && room.roomId).then(res => {
            return setMessages(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [room, room.roomId])

    const createChat = async () => {
        try {
            const message = { message: text, sender: user._id, senderName: user.name, receiver: room.receiver, receiverName: room.receiverName }
            room && await socket.emit("sendChat", message, room.roomId)
            await createMessage(message, room.roomId)
            setText("")
        } catch (err) {
            console.log(err)
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
                <ul>
                    {(messages && messages.length > 0 && messages.map((m, index) => (
                        m.message.startsWith('https://firebasestorage.googleapis.com') ?
                            <li key={index} className={m.senderName === user.name ? "sent" : "replies"}>
                                <Image style={{ height: "250px" }} src={m.message} alt={m.message} />
                            </li>
                            :
                            <li key={index} className={m.senderName === user.name ? "sent" : "replies"}>
                                <p>{m.message}</p>
                            </li>
                    )))}
                </ul>
            </div>
            <div class="message-input">
                <div class="wrap">
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Write your message..." />
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
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from "socket.io-client";
import SidePanel from './SidePanel'
import Messages from './Messages'
import './css/chat.css'
const ENDPOINT = "http://localhost:5001";

let socket
const Chat = () => {
    const dispatch = useDispatch()
    const room = useSelector(state => state.room)
    useEffect(() => {
        const connect = () => {
            socket = socketIOClient(ENDPOINT, {
                transports: ['websocket'],
                jsonp: false
            })
            dispatch({
                type: "SET_SOCKET",
                payload: socket
            })
            socket.on("connect", () => {
                console.log(socket);
            })
        }
        return connect()
    }, [dispatch])

    return (
        <div id="frame">
            <SidePanel socket={socket} />
            {room ? <Messages socket={socket} /> : <p style={{ color: "#777672", fontWeight: "600", position: "absolute", top: "50%", left: "50%" }}>Your conversation will be deleted after 48 hours. </p>}
        </div>
    )
}
export default Chat

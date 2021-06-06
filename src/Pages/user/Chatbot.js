import React, { useEffect, useRef, useState } from 'react'
import '../../css/chatbot.css'
import { eventQuery, textQuery } from '../../functions/Chatbot'
import Bot from '../../images/bot.png'
import { useHistory } from 'react-router-dom'
// import ChatBot from 'react-simple-chatbot'

const Chat = ({ bot }) => {
    const [text, setText] = useState(null)
    const [messages, setMessages] = useState([])
    const messageRef = useRef()
    const history = useHistory()
    useEffect(() => {
        sendEvent("WelcomeToElixir")
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

    messageRef.current && messageRef.current.scrollIntoView({ behavior: "smooth" })

    const sendMessage = async () => {
        if (text !== null) {
            try {

                setMessages(messages => [...messages, { who: "user", content: { text: { text: text } } }])
                await textQuery(text).then(res => {
                    res.data.fulfillmentMessages.forEach(content => {
                        setMessages(messages => [...messages, { who: "bot", content }])
                    })
                    setText("")
                }
                ).catch(err => {
                    setMessages(messages => [...messages, { who: "bot", content: { text: { text: "Error occur@ Check your connection" } } }])
                })
            } catch (err) {
                console.log(err);
            }
        }
    }

    const sendEvent = async (eventName) => {
        try {
            await eventQuery(eventName).then(res => {
                res.data.fulfillmentMessages.forEach(content => {
                    setMessages(messages => [...messages, { who: "bot", content }])
                })
                setText(null)
            }
            ).catch(err => {
                setMessages(messages => [...messages, { who: "bot", content: { text: { text: "Error Occur! Check Your connection!" } } }])
            })
        } catch (err) {
            console.log(err);
        }
    }

    const sendChat = (e) => {
        if (e.key === "Enter") return sendMessage()
    }

    const redirectToProducts = (id) => {
        history.push(`/product/find?category=${id}`)
    }
    const redirectToPage = (link) => {
        history.push(link)
    }

    return (
        <div>
            <div className="chatbot">
                <div className="title">
                    <img src={Bot} className="title-img" alt="title" />
                    <h5 className="title-text">Mr. Mobo</h5>
                </div>
                <div className="divider">
                    <div></div>
                </div>
                <div className="messages">
                    <ul>
                        {
                            messages && messages.map((message, index) => (
                                <>
                                    {message.content.text && message.content.text.text && <li key={index}><p className={message.who === "user" ? "sent" : "replies"}>{message.content.text.text}</p></li>}
                                    {message.content.payload && message.content.payload.fields.cards && message.content.payload.fields.cards.listValue.values.map((c, i) => <button key={i} className="message-card" onClick={() => redirectToProducts(c.structValue.fields._id.stringValue)}>{c.structValue.fields.name.stringValue}</button>)}
                                    {message.content.payload && message.content.payload.fields.choice && message.content.payload.fields.choice.listValue.values.map((c, i) => <button key={i} className="message-card" onClick={() => redirectToPage(c.structValue.fields.link.stringValue)}>{c.structValue.fields.name.stringValue}</button>)}
                                </>
                            ))
                        }
                        <li ref={messageRef}></li>
                    </ul>
                </div>
                <div className="text">
                    <input className="form-input" type="text" onKeyPress={(e) => sendChat(e)} placeholder="Ask anything" value={text} onChange={e => setText(e.target.value)} />
                    <button onClick={() => sendMessage()}><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

    )
}

export default Chat

import firebase from 'firebase/app'
import 'firebase/storage'
import Resizer from 'react-image-file-resizer'
import { v4 as uuidV4 } from 'uuid';
import React from 'react'

const SingleImage = ({ file, socket, user, createMessage, room, uploaded, setUploaded }) => {

    uploaded && Resizer.imageFileResizer(file, 720, 720, 'JPEG/PNG', 100, 0, (uri) => {

        const id = uuidV4()
        const imageRef = firebase.storage().ref('chat-images/' + id + `.${file.name.split(".")[1]}`)
        const uploadTask = imageRef.put(uri)
        uploadTask.on('state_changed', snap => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            console.log(percentUploaded)
        }, err => {
            console.error(err)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                const message = { message: downloadURL, sender: user && user._id, senderName: user && user.name, receiver: room && room.receiver, receiverName: room && room.receiverName }
                room && socket.emit("sendChat", message, room.roomId)
                createMessage(message, room.roomId)
            });
        })
    }, "file")
    setUploaded(false)
    return (
        <div>
        </div>
    )
}

export default SingleImage



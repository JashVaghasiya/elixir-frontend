import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

import { Badge, Button, Image } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { Form } from 'react-bootstrap'

const UploadImage = ({ uploadedFile, setUploadedFile }) => {

    const [file, setFile] = useState(uploadedFile)
    const [loading, setLoading] = useState(false)
    const storageRef = firebase.storage().ref('product-images/')

    useEffect(() => {
    }, [file, uploadedFile])



    const handelUpload = () => {
        for (let i = 0; i < file.length; i++) {
            setLoading(true)
            const imageRef = firebase.storage().ref('product-images/' + file[i].name)
            const uploadTask = imageRef.put(file[i])


            uploadTask.on('state_changed', snap => {
                const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                console.log(percentUploaded)
            }, err => {
                console.error(err)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                    uploadedFile.push({
                        name: file[i].name,
                        url: downloadURL
                    })

                });
                setLoading(false)
            })
        }
        setFile([])
    }




    const deleteImage = (file) => {
        setLoading(true)
        const image = storageRef.child(file)
        image.delete().then(() => {
            const newFiles = uploadedFile.filter(imgFile => {
                return file !== imgFile.name
            })
            setUploadedFile(newFiles)
            setLoading(false)
        }).catch(err => {
            console.log("Image Delete:", err)
        })

    }

    const uploadImage = () => {
        return uploadedFile && uploadedFile.length > 0 ? uploadedFile.map(file => (
            <span key={file.url}>
                <Badge style={{ cursor: "pointer" }} count="X" onClick={() => deleteImage(file.name)}></Badge>
                <Avatar size={150} shape="square" src={<Image src={file.url} />} />
            </span>
        )) : 'No Images to Preview!'
    }


    uploadImage()



    return (
        <div>
            <div>
                <Form.File label="Select Images" className="mt-2" data-browse="Images" multiple onChange={e => setFile(e.target.files)} />
                <Button className="mt-2" onClick={handelUpload} disabled={loading}>Upload</Button>
                <br />
            </div>
            <div className="mt-2">
                {uploadImage()}
            </div>
        </div>
    )
}

export default UploadImage
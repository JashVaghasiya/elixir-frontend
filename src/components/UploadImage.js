import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import Resizer from 'react-image-file-resizer'
import { Badge, Image } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { Form } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid';

const UploadImage = ({ uploadedFile, setUploadedFile, setSubmit }) => {

    const [file, setFile] = useState(uploadedFile)
    const [loading, setLoading] = useState(false)
    const storageRef = firebase.storage().ref('product-images/')

    useEffect(() => {
    }, [file, uploadedFile, loading])

    const handelUpload = () => {
        setSubmit(false)

        for (let i = 0; i < file.length; i++) {
            setLoading(true)
            Resizer.imageFileResizer(file[i], 720, 720, 'JPEG/PNG', 100, 0, (uri) => {
                const id = uuidV4()
                const imageRef = firebase.storage().ref('product-images/' + id + `.${file[i].name.split(".")[1]}`)
                const uploadTask = imageRef.put(uri)
                uploadTask.on('state_changed', snap => {
                    const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                    console.log(percentUploaded)
                }, err => {
                    console.error(err)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                        uploadedFile.push({
                            name: id + `.${file[i].name.split(".")[1]}`,
                            url: downloadURL
                        })
                        setLoading(false)
                    });

                })
            }, "file")
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
        return uploadedFile && uploadedFile.map(file => (
            <span key={file.url}>
                <Avatar size={150} shape="square" src={<Image src={file.url} />} />
                <sup style={{ cursor: "pointer", position: "relative", top: "-75px", right: "10px", verticalAlign: "baseline", fontSize: "75%", lineHeight: "0" }}><Badge count="X" onClick={() => deleteImage(file.name)} alt="Delete"></Badge></sup>
            </span>
        ))
    }


    return (
        <div>
            <div>
                <Form.File id="uploader" style={{ color: "white", fontSize: "15px", fontWeight: "200" }} data-browse="Images" multiple onChange={e => setFile(e.target.files)} hidden />
                <label htmlFor="uploader" className="create-button p-2 mr-3" style={{ background: "#343a40", color: "#fff", border: "1px #fff solid" }}>Select Images</label>
                <button className="mt-2 create-button p-2" onClick={handelUpload} disabled={loading}>{loading ? "Loading..." : "Upload"}</button>
            </div>
            <div className="mt-2">

                {uploadImage()}
            </div>
        </div>
    )
}

export default UploadImage
import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import firebase from 'firebase'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import { v4 as uuidV4 } from 'uuid'
import { Badge, Image } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'

const Poster = () => {

    const [posterUrl, setPosterUrl] = useState([])
    const [load, setLoad] = useState(true)
    const [loading, setLoading] = useState(false)

    const getPosters = async () => {

        setPosterUrl([])
        setLoading(true)
        await firebase.storage().ref('posters/').list().then(result => {
            result._delegate.items.forEach(p => {
                const image = firebase.storage().ref(p._location.path_)
                image.getDownloadURL().then(downloadURL => {
                    setPosterUrl(posterUrl => [...posterUrl, { name: p._location.path_, url: downloadURL }])
                })
            })
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })

    }

    if (load) {
        getPosters()
        setLoad(false)
    }

    const uploadPoster = (file) => {
        const id = uuidV4()
        const imageRef = firebase.storage().ref('posters/' + id + `.${file[0].name.split(".")[1]}`)
        const uploadTask = imageRef.put(file[0])
        uploadTask.on('state_changed', snap => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            console.log(percentUploaded)
        }, err => {
            console.error(err)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setPosterUrl(posterUrl => [...posterUrl, { name: 'posters/' + id + `.${file[0].name.split(".")[1]}`, url: downloadURL }])
            })
        })
    }

    const deletePoster = (file) => {
        console.log(file);
        const image = firebase.storage().ref(file)
        image.delete().then(() => {
            const newFiles = posterUrl.filter(imgFile => {
                return file !== imgFile.name
            })
            setPosterUrl(newFiles)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="poster" />
                <main>
                    <div className="main__container">
                        <h3>Posters</h3>
                        <input id="upload-poster" type="file" onChange={(e) => uploadPoster(e.target.files)} hidden />
                        <label htmlFor="upload-poster" className="form-button mt-3">Upload Poster</label>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {posterUrl.length > 0 && posterUrl.map(file => (
                                    <span key={file.url} className="mt-3 mr-1">
                                        <Avatar size={150} shape="square" src={<Image src={file.url} />} />
                                        <sup style={{ cursor: "pointer", position: "relative", top: "-75px", right: "10px", verticalAlign: "baseline", fontSize: "75%", lineHeight: "0" }}><Badge count="X" onClick={() => deletePoster(file.name)} alt="Delete"></Badge></sup>
                                    </span>
                                ))}
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Poster

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDoctorProfile, updateDoctorProfile, updateDoctorProfilePicture } from '../../functions/doctor'
import { Alert } from 'react-bootstrap'
import { Image, Row, Col } from 'react-bootstrap'
import firebase from 'firebase'
import Avatar from '../../images/doctorAvatar.jpeg'
import { v4 as uuidV4 } from 'uuid';
import Resizer from 'react-image-file-resizer'

const UpdateDoctorProfile = ({ history }) => {

    const user = useSelector(state => state.user)
    const [alert, setAlert] = useState(null)
    const [doctorMobile, setDoctorMobile] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [doctorExperience, setDoctorExperience] = useState('')
    const [doctorSpecialization, setDoctorSpecialization] = useState('')
    const [doctorDegree, setDoctorDegree] = useState('')
    const [doctorEmail, setDoctorEmail] = useState('')
    const [profileUrl, setProfileUrl] = useState(null)

    useEffect(() => {
        const doctorDetail = () => {
            getDoctorProfile(user && user._id, user && user.token).then(res => {
                setDoctorEmail(res.data.email)
                setDoctorMobile(res.data.mobile)
                setDoctorExperience(res.data.experience)
                setDoctorSpecialization(res.data.specialization)
                setDoctorDegree(res.data.degree)
                setDoctorName(res.data.name)
                setDoctorMobile(res.data.mobile)
                setProfileUrl(res.data.profileUrl)
            }).catch(error => {
                console.log(error)
            })
        }
        return doctorDetail()
    }, [user, profileUrl])


    const updateProfile = async () => {

        if (doctorDegree.length < 0 || doctorName.length < 0 || doctorSpecialization.length < 0 || doctorExperience.length < 0) {
            setAlert("Fill Empty Fields!")
        } else if (doctorMobile.length < 0 || doctorMobile.length > 10) {
            setAlert("Enter Valid MObile No.")
        } else {
            await updateDoctorProfile({ doctorName, doctorMobile, doctorSpecialization, doctorDegree, doctorExperience }, user && user._id, user && user.token).then(res => {
                if (res) {
                    history.push('/doctor/profile')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const updateProfilePicture = (file) => {
        if (profileUrl !== null) {
            const image = firebase.storage().ref('doctor-images/').child(profileUrl)
            image.delete().then(() => {
            }).catch(err => {
                console.log("Image Delete:", err)
            })
        }
        file[0] && Resizer.imageFileResizer(file[0], 720, 720, 'JPEG/PNG', 100, 0, (uri) => {
            const id = uuidV4()
            const imageRef = firebase.storage().ref('doctor-images/' + id + `.${file[0].name.split(".")[1]}`)
            const uploadTask = imageRef.put(uri)
            uploadTask.on('state_changed', snap => {
                const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                console.log(percentUploaded)
            }, err => {
                console.error(err)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    setProfileUrl(downloadURL)
                    await updateDoctorProfilePicture(downloadURL, user._id, user.token)

                });
            })
        }, "file")
    }



    return (
        <div className="main__container">
            <Row className="justify-content-md-center shipping-form">
                <Col xs={12} md={6}>
                    <div class="img-title">
                        <div class="img">
                            <Image src={profileUrl !== null ? profileUrl : Avatar} alt="profile-photo" className="profile-avatar" />
                            <input type="file" id="upload" hidden onChange={(e) => updateProfilePicture(e.target.files)} />
                            <label className="fas fa-edit" style={{ cursor: "pointer", position: "relative", top: "50px", right: "30px", verticalAlign: "baseline", fontSize: "15px", lineHeight: "0", color: "#454545" }} for="upload" aria-hidden="true">
                            </label>
                        </div>
                        <h2 className="mt-4">Update Profile</h2>
                    </div>

                    <label className="float-left mt-2">Email</label>
                    <input type='text' value={doctorEmail && doctorEmail} disabled />
                    <label className="float-left mt-2">Name</label>
                    <input type='text' value={doctorName && doctorName} onChange={e => setDoctorName(e.target.value)} />
                    <label className="float-left mt-2">Mobile No.</label>
                    <input type='text' value={doctorMobile && doctorMobile} maxLength={10} minLength={10} onChange={e => setDoctorMobile(e.target.value)} />
                    <label className="float-left mt-2">Degree</label>
                    <input type='text' value={doctorDegree && doctorDegree} onChange={e => setDoctorDegree(e.target.value)}></input><label className="float-left mt-2">Specialization</label>
                    <input type='text' value={doctorSpecialization && doctorSpecialization} onChange={e => setDoctorSpecialization(e.target.value)} />
                    <label className="float-left mt-2">Experience</label>
                    <input type='text' value={doctorExperience && doctorExperience} onChange={e => setDoctorExperience(e.target.value)} />
                    {alert !== null && <Alert variant="dark" className="text-white">{alert}</Alert>}
                    <button className="form-button my-3" onClick={() => updateProfile()}>Save Profile</button>
                </Col>
            </Row>
        </div>
    )
}

export default UpdateDoctorProfile

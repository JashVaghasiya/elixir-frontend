import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDoctorProfile } from '../../functions/doctor'
import '../../css/SellerProfile.css'
import { Image, Form, Row, Col } from 'react-bootstrap'
import Avatar from '../../images/doctorAvatar.jpeg'

const DoctorProfile = ({ match, history }) => {

    const user = useSelector(state => state.user)
    const [doctorData, setDoctorData] = useState('')

    useEffect(() => {
        if (user) {
            loadDoctor()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const loadDoctor = () => {
        getDoctorProfile(user && user._id, user && user.token).then(res => {
            setDoctorData(res.data)
            console.log(doctorData)
        }).catch(error => {
            console.log(error)
        })
    }

    const updateDoctorProfile = () => {
        history.push("/doctor/update/profile")
    }

    return (
        <div className="main__container">
            <Row className="justify-content-md-center shipping-form">
                <Col xs={12} md={6}>
                    <div class="img-title">
                        <div class="img">
                            <Image src={doctorData.profileUrl !== null ? doctorData.profileUrl : Avatar} alt="profile-photo" className="profile-avatar" />
                        </div>
                        <h2 className="mt-4">Your Profile</h2>
                    </div>
                    <Form className="mt-4">
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <br />
                            <input type='text' value={doctorData && doctorData.email} ></input>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Doctor Name</Form.Label>
                            <br />

                            <input type='text' value={doctorData && doctorData.name} disabled ></input>
                        </Form.Group>
                        <Form.Group controlId='name'>
                            <Form.Label>Doctor Mobile</Form.Label>
                            <br />

                            <input type='text' value={doctorData && doctorData.mobile} disabled ></input>
                        </Form.Group>
                        <Form.Group controlId='name'>
                            <Form.Label>Doctor Degree</Form.Label>
                            <br />
                            <input type='text' value={doctorData && doctorData.degree} disabled ></input>
                        </Form.Group>
                        <Form.Group controlId='name'>
                            <Form.Label>Doctor Specialization</Form.Label>
                            <br />
                            <input type='text' value={doctorData && doctorData.specialization} disabled ></input>
                        </Form.Group>
                        <Form.Group controlId='name'>
                            <Form.Label>Doctor Experience</Form.Label>
                            <br />
                            <input type='text' value={doctorData && doctorData.experience} disabled ></input>
                        </Form.Group>
                        <Form.Group controlId='name'>
                            <Form.Label>Doctor Joined At</Form.Label>
                            <br />
                            <input type='text' value={doctorData && doctorData.createdAt && doctorData && doctorData.createdAt.substr(0, 10)} disabled ></input>
                        </Form.Group>
                        <button className="form-button" onClick={() => updateDoctorProfile()}>Update Profile</button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default DoctorProfile

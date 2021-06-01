import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserProfile, updateUser } from '../../functions/user'
import '../../main.css'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'

const UpdateUserProfile = ({ history }) => {

    const user = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0)
        const loadUser = () => {
            getUserProfile(user && user._id, user && user.token).then(res => {
                setUserEmail(res.data.email)
                setUserName(res.data.name)
                setUserMobile(res.data.mobile)
            }).catch(error => {
                console.log(error)
            })
        }
        return loadUser()
    }, [user])

    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userMobile, setUserMobile] = useState(null)
    const [alert, setAlert] = useState(null)

    const updateProfile = () => {
        if (userMobile !== null || userMobile !== '') {
            console.log(userMobile)
            if (userMobile.length < 10) {
                setAlert('Enter Valid Mobile Number')
                setTimeout(() => {
                    setAlert(null)
                }, 3000)
            }
            else {
                updateUser(userName, userMobile, user && user._id, user && user.token).then(res => {
                    console.log(res.data)
                    history.push('/user/profile')
                }).catch(error => {
                    console.log(error)
                })
            }
        }
        else {
            updateUser(userName, userMobile, user && user._id, user && user.token).then(res => {
                console.log('user')
                history.push('/user/profile')
            }).catch(error => {
                console.log(error)
            })
        }

    }



    return (
        <div className="main__container">

            <div class="main__title">
                {/* <img src={WelcomeBack} alt="welcome photo" /> */}
                <div class="main__greeting">
                    <h1>Hello {user && user.name}</h1>
                    <p>Welcome to your Profile</p>
                </div>
            </div>
            <div class="counters">
                <Link to={`/user/order`}>
                    <div class="user-master-card">
                        <i className="fas fa-box-open fa-3x"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Orders</p>
                            <div class="counter" ></div>
                        </div>
                    </div>
                </Link>
                <Link to={`/user/wishlist`}>
                    <div class="user-master-card">
                        <i className="fas fa-heart fa-3x"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Wishlist</p>
                            <div class="counter"></div>
                        </div>
                    </div>
                </Link>
                <Link to={`/user/cart`}>
                    <div class="user-master-card">
                        <i className="fas fa-shopping-cart fa-3x"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Cart</p>
                            <div class="counter" ></div>
                        </div>
                    </div>
                </Link>
                <Link to={`/user/list/complain`}>
                    <div class="user-master-card">
                        <i class="fas fa-align-left fa-3x"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Complain</p>
                            <div class="counter" ></div>
                        </div>
                    </div>
                </Link>
            </div>
            <hr className="mt-5" />
            <h5>Update Info</h5>
            <hr />

            <Row className="shipping-form">
                <Col xs={12} md={6}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <br />

                        <input type='text' value={userEmail && userEmail} disabled></input>

                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Name</Form.Label>
                        <br />

                        <input type='text' value={userName && userName} onChange={e => setUserName(e.target.value)}></input>

                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Mobile</Form.Label>
                        <br />

                        <input type='text' value={userMobile} onChange={e => setUserMobile(e.target.value)} ></input>

                    </Form.Group>
                </Col>
            </Row>

            {alert !== null ? <Alert variant="warning">{alert}</Alert> : ''}

            <button className="form-button" onClick={() => updateProfile()}>Save Profile</button>
        </div>
    )
}

export default UpdateUserProfile

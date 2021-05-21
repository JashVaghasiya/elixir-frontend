import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserProfile } from '../../functions/user'
import '../../main.css'
import '../../css/UserProfile.css'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'

const UserProfile = ({ history }) => {

    const user = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0)
        const loadUser = () => {
            getUserProfile(user && user._id, user && user.token).then(res => {
                setUserData(res.data)
            }).catch(error => {
                console.log(error)
            })
        }
        return loadUser()
    }, [user])

    const [userData, setUserData] = useState('')

    const updateProfile = () => {
        history.push('/update/user/profile')
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
            <h5>Personal Info</h5>
            <hr />
            <Row className="shipping-form">
                <Col xs={12} md={6}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <br />

                        <input type='text' value={userData && userData.email} disabled></input>

                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Name</Form.Label>
                        <br />

                        <input type='text' value={userData && userData.name} disabled></input>

                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Mobile</Form.Label>
                        <br />

                        <input type='text' value={userData.mobile ? userData.mobile : 'Mobile Number is not Provided'} disabled></input>

                    </Form.Group>

                    <button className="form-button" onClick={() => updateProfile()}>Update Profile</button>
                </Col>
            </Row>
        </div>
    )
}

export default UserProfile

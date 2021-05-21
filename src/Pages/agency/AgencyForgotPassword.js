import { auth } from '../../firebase/firebase'
import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Col, Row, Toast } from 'react-bootstrap'
import AgencyHeader from '../../components/nav/HeaderMain'
import AgencySideNav from '../../components/nav/Agency'
import { inputField } from '../../main'

const SellerForgotPassword = ({ history }) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        inputField()
    }, [])


    const handleForgotPassword = async e => {
        e.preventDefault()
        setLoading(true)

        const config = {
            handleCodeInApp: true,
            url: 'http://localhost:3000/login'
        }

        await auth.sendPasswordResetEmail(email, config).then(() => {
            setEmail("")
            setLoading(false)
            console.log('forgot password link has been sent');
        }).catch(err => {
            console.log('error while sending forgot password link-->', err);
            setLoading(false)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <AgencyHeader />
                <AgencySideNav active="changePassword" />
                <main>
                    <div className="main__container">
                        <h3>Forgot Password</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>
                                <div class="content">
                                    <div class="form">
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter Email ID</h5>
                                                <input className="input-tag" type='email' size='large' value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <input block size='large' onClick={handleForgotPassword} type="primary" value="Send Link" className='btn-main' disabled={loading} />
                                    </div>
                                </div>

                                <Toast className="mt-2" onClose={() => setShow(false)} show={show} delay={2000} autohide>
                                    <Toast.Header>
                                        Link has been send to your email Address.
                            </Toast.Header>
                                </Toast>

                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SellerForgotPassword



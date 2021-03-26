import { Button, Input, Spin } from 'antd'
import Form from 'antd/lib/form/Form'
import { auth } from '../firebase/firebase'
import React, { useState } from 'react'
import '../App.css'
import { Col, Container, Row, Toast } from 'react-bootstrap'
import SideNav from '../components/nav/SellerSideNav'
import { useSelector } from 'react-redux'
import AdminSideNav from '../components/nav/AdminSideNav'

const ForgotPassword = ({ history }) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const user = useSelector(state => state.user)

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
        <div>
            {user && user !== null ?
                user && user.role === "admin" ? <AdminSideNav /> : <SideNav /> : ''}
            <div className="page-content">
                <Container fluid>
                    <h2>Forgot Password</h2>
                    <Row className="mt-3">
                        <Col sm="6" md="6" lg="4">
                            <Form>
                                <Input placeholder='Enter Email' type='email' size='large' value={email} onChange={e => setEmail(e.target.value)} className='mt-2'></Input>
                                <Button block disabled={loading} size='large' onClick={handleForgotPassword} type="primary" className='mt-3'>{loading ? <Spin /> : 'Send link'}</Button>
                                <Toast className="mt-2" onClose={() => setShow(false)} show={show} delay={2000} autohide>
                                    <Toast.Header>
                                        Link has been send to your email Address.
                            </Toast.Header>
                                </Toast>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ForgotPassword
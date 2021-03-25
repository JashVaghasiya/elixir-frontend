import React, { useState } from 'react'
import { Input, Button, Spin } from 'antd'
import Form from 'antd/lib/form/Form'
import { auth } from '../../firebase/firebase'
import '../../App.css'
import { Col, Container, Row, Toast } from 'react-bootstrap'


const Register = () => {

    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        setShow(true)
        setLoading(true)
        e.preventDefault()

        const config = {
            url: "http://localhost:3000/registration/complete",
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)

        window.localStorage.setItem('email', email)

        setEmail('')
    }

    return (
        <Container fluid>
            <Row className="mt-5">
                <Col sm="6" md="6" lg="4" className='mt-5'>
                    <Form className='mt-5'>
                        <h1>Register</h1>
                        <Input placeholder='Enter Email' name='txtEmail' size='large' onChange={e => setEmail(e.target.value)} disabled={loading} />
                        <Button type="primary" style={{ marginTop: "10px" }} onClick={submitHandler} block disabled={loading}>{loading ? <Spin /> : 'Sign Up'}</Button>
                        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                            <Toast.Header>
                                Email has been send to your email address.
                            </Toast.Header>
                        </Toast>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register

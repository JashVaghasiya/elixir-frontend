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
        <div className="container">

            <Form style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                <h1 className="mt-5">Register</h1>
                <hr />
                <div className="form-group">
                    <label>Email</label>
                    <Input placeholder='Enter Email' name='txtEmail' size='large' onChange={e => setEmail(e.target.value)} disabled={loading} />
                </div>
                <Button type="primary" style={{ marginTop: "10px" }} onClick={submitHandler} block disabled={loading}>{loading ? <Spin /> : 'Sign Up'}</Button>
                <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                    <Toast.Header>
                        Email has been send to your email address.
                            </Toast.Header>
                </Toast>
            </Form>
        </div>
    )
}

export default Register

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Spin } from 'antd'
import { Col, Container, Row } from 'react-bootstrap'
import { auth } from '../../firebase/firebase'
import { createUser } from '../../functions/user'
import { useDispatch } from 'react-redux'

const RegisterComplete = ({ history }) => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const url = window.location.href

    useEffect(() => {
        setEmail(window.localStorage.getItem('email'))
    }, [])

    const submitHandler = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailLink(email, url)
            console.log(result);
            if (result.user.emailVerified) {
                window.localStorage.removeItem('email')

                let user = auth.currentUser
                await user.updatePassword(password)
                const idToken = await user.getIdTokenResult()
                await createUser(idToken.token).then(res => {
                    console.log(res);
                    dispatch({
                        type: 'LOGIN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idToken.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    })
                    setLoading(false)
                    if (res.data.role === 'admin') {
                        history.push('/admin/dashboard')
                    } else if (res.data.role === 'seller') {
                        history.push('/seller/dashboard')
                    } else {
                        history.push('/user/profile')
                    }
                }
                ).catch(error => {
                    console.log("error in after signUp", error);
                })
            }
        } catch (error) {
            console.log('error in signUp');
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <Container fluid>
            <Row className="mt-5">
                <Col sm="6" md="6" lg="4" className='mt-5'>
                    <Form className='mt-5'>
                        <h1>Complete Register</h1>
                        <Input name="txtEmail" size='large' value={email} className='mt-2' disabled />
                        <Input name="txtPassword" size='large' value={password} className='mt-2' onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                        <Button type="primary" onClick={submitHandler} className='mt-3' block disabled={loading}>{loading ? <Spin /> : 'Register'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterComplete

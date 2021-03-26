import { Button, Input, Spin } from 'antd'
import Form from 'antd/lib/form/Form'
import { auth } from '../../firebase/firebase'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../App.css'
import { findUser, roleBasedRedirect } from '../../functions/user'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Login = ({ history }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const user = useSelector(state => state.user)

    useEffect(() => {
        // if (user && user.token) {
        //     history.push('/')
        // }
    }, [user])

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)

        try {

            if (email !== null) {

                if (password !== null) {
                    const result = await auth.signInWithEmailAndPassword(email, password).catch(err => {

                        if (err.code === 'auth/user-not-found') {

                            setError("Invalid User or User Not Found!")
                        }
                        if (err.code === 'auth/wrong-password') {

                            setError("Invalid Password or Empty Password!")
                        }
                        if (err.code === 'auth/network-request-failed') {

                            setError("Network Error!")
                        }
                        setLoading(false)
                    })
                    const { user } = result
                    const token = await user.getIdTokenResult()

                    await findUser(token.token).then(res => {
                        if (res.data.user[0]) {
                            console.log(res.data.user[0]);
                            roleBasedRedirect(history, res.data.user[0])
                        }
                        setLoading(false)
                    }).catch(err => console.error('Create or Update User Error :', err))

                } else {
                    setError("Fill Password Properly!")
                    setLoading(false)
                }

            } else {
                setError("Fill Email Properly!")
                setLoading(false)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <Form style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                <h1 className="mt-5">Login</h1>
                <hr />
                <div className="form-group">
                    <label>Email</label>
                    <Input placeholder='Enter Email' type='email' required size='large' value={email} onChange={e => setEmail(e.target.value)}></Input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Input placeholder='Enter Password' type='password' size='large' value={password} onChange={e => setPassword(e.target.value)}></Input>
                </div>
                <Button block disabled={loading} size='large' onClick={handleLogin} type="primary" className='mt-2'>{loading ? <Spin /> : 'Login'}</Button>
                {error !== null ? <Alert className="mt-3" variant="danger">{error}</Alert> : ''}
                <div className="float-right mt-3" style={{ fontSize: "18px" }}>
                    <Link to="/change/password">Forgot Password ?</Link>
                </div>
            </Form>
        </div>

    )
}

export default Login

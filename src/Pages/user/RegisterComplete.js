import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { auth } from '../../firebase/firebase'
import { createUser } from '../../functions/user'
import { useDispatch } from 'react-redux'

const RegisterComplete = ({ history }) => {

    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const url = window.location.href

    useEffect(() => {
        if (window.localStorage.getItem('email') == null) {
            history.push("/register")
        }
        setEmail(window.localStorage.getItem('email'))
    }, [history])

    const submitHandler = async () => {
        setLoading(true)
        if (password == null) {
            setError("Password field is Empty!")
        } else if (email == null) {
            setError("Email field is Empty!")
        } else {
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
                        if (res.data.alreadyUser) {
                            setError(res.data.alreadyUser)
                        } else {
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
                            } else if (res.data.role === 'agency') {
                                history.push('/agency/1')
                            } else if (res.data.role === 'doctor') {
                                history.push('/doctor/profile')
                            } else {
                                history.push('/')
                            }
                        }
                    }).catch(error => {
                        console.log("error in after signUp", error);
                    })
                }
            } catch (error) {
                console.log('error in signUp');
                console.log(error);
                setLoading(false)
            }
        }
    }
    setTimeout(() => {
        setError(null)
    }, 5000)

    return (
        <div className="doctor-login-container">
            <div className="container shipping-form">
                <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5">Complete Registration</h2>
                    <label className="mt-3">Email</label>
                    <input placeholder='Enter Email' type='email' required size='large' value={email} onChange={e => setEmail(e.target.value)} />

                    <label className="mt-3">Password</label>
                    <input placeholder='Enter Password' type='password' size='large' value={password} onChange={e => setPassword(e.target.value)} />

                    <button className="form-button btn-block my-3" disabled={loading} onClick={() => submitHandler()}>{loading ? "Loading..." : "Login"}</button>
                    {error !== null ? <Alert variant="dark" className="mt-3 text-white">{error}</Alert> : ''}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete

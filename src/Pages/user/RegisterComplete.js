import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { auth } from '../../firebase/firebase'
import { createUser } from '../../functions/user'

const RegisterComplete = ({ history }) => {

    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
                        if (res) {
                            console.log(res.data)
                            history.push('/login')
                        } else {
                            if (res.data.alreadyUser) {
                                setError(res.data.alreadyUser)
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

    return (
        <div className="doctor-login-container">
            <div className="container shipping-form">
                <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5">Complete Registration</h2>
                    <label className="mt-3">Email</label>
                    <input placeholder='Enter Email' type='email' required size='large' value={email} onChange={e => setEmail(e.target.value)} />

                    <label className="mt-3">Password</label>
                    <input placeholder='Enter Password' type='password' size='large' value={password} onChange={e => setPassword(e.target.value)} />

                    <button className="form-button btn-block my-3" disabled={loading} onClick={() => submitHandler()}>{loading ? "Loading..." : "Register"}</button>
                    {error !== null ? <Alert variant="dark" className="mt-3 text-white">{error}</Alert> : ''}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete

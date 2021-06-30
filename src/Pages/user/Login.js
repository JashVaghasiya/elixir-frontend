import { auth } from '../../firebase/firebase'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../App.css'
import { findUser, roleBasedRedirect } from '../../functions/user'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Login = ({ history }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const user = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (user && user._id) {
            history.push('/')
        }
    }, [user, history])

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)

        try {

            if (email !== null && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

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
                        if (res) {
                            if (res.data.deactivated) {
                                setError(res.data.deactivated)
                            } else {
                                roleBasedRedirect(history, res.data)
                            }
                        }
                        setLoading(false)
                    }).catch(err => console.error('Create or Update User Error :', err))

                } else {
                    setError("Enter Password Properly!")
                    setLoading(false)
                }

            } else {
                setError("Enter Email Properly!")
                setLoading(false)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login-page-container">
            <div className="container shipping-form">
                <div style={{ height: "85vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5">Login</h2>
                    <label className="mt-3">Email</label>
                    <input placeholder='Enter Email' type='text' size='large' value={email} onChange={e => setEmail(e.target.value)} />

                    <label className="mt-3">Password</label>
                    <input placeholder='Enter Password' type='password' size='large' value={password} onChange={e => setPassword(e.target.value)} />

                    <button className="form-button btn-block my-3" disabled={loading} onClick={handleLogin}>{loading ? "Loading..." : "Login"}</button>
                    {error !== null ? <Alert variant="dark" className="mt-3 text-white">{error}</Alert> : ''}
                    <div className="float-right" style={{ fontSize: "14px" }}>
                        <Link to="/change/password" ><p style={{ color: "#000" }}>Forgot Password ?</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

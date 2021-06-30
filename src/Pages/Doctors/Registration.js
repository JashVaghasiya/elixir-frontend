import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { auth } from '../../firebase/firebase'


const Registration = () => {

    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    window.scrollTo(0, 0)

    const submitHandler = async (e) => {
        if (email !== null && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setLoading(true)
            e.preventDefault()
            const config = {
                url: "http://localhost:3000/doctor/registration/complete",
                handleCodeInApp: true
            }
            await auth.sendSignInLinkToEmail(email, config)
            window.localStorage.setItem('email', email)
            setEmail(null)
        } else {
            setError("Enter Valid Email in field!")
        }

    }
    setTimeout(() => {
        setError(null)
    }, 5000)

    return (
        <div className="login-page-container">
            <div className="container shipping-form">
                <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5 mb-4">Register As Doctor</h2>
                    <label>Email</label>
                    <input placeholder='Enter Email' name='txtEmail' size='large' onChange={e => setEmail(e.target.value)} disabled={loading} />
                    <button className="form-button my-3 btn-block" onClick={submitHandler} disabled={loading}>{loading ? "Loading..." : 'Sign Up'}</button>
                    {error !== null && <Alert variant="dark" className="text-white">{error}</Alert>}
                </div>
            </div>
        </div>
    )
}

export default Registration

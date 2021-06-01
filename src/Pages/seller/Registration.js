import React, { useState } from 'react'
import { auth } from '../../firebase/firebase'
import '../../App.css'
import { Alert } from 'react-bootstrap'


const Registration = () => {

    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const submitHandler = async (e) => {
        if (email === null) {
            setError("Enter Email in field!")
        } else {
            setLoading(true)
            window.localStorage.setItem('email', email)
            e.preventDefault()

            const config = {
                url: "http://localhost:3000/seller/registration/complete",
                handleCodeInApp: true
            }
            await auth.sendSignInLinkToEmail(email, config).then(res => {
                setLoading(false)
            })
            setError("Registration link is sent to your Email")
        }

    }

    return (
        <div className="login-page-container pt-5">
            <div className="container shipping-form">
                <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mb-2">Seller Register</h2>
                    <label>Email</label>
                    <input placeholder='Enter Email' name='txtEmail' size='large' onChange={e => setEmail(e.target.value)} disabled={loading} />
                    <button className="form-button btn-block my-3" onClick={submitHandler} disabled={loading}>{loading ? "Loading..." : 'Send Link'}</button>
                    {error !== null ? <Alert variant="dark" className="mt-3 text-white">{error}</Alert> : ''}
                </div>
            </div>
        </div>
    )
}

export default Registration

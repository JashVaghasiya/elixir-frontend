import { auth } from '../../firebase/firebase'
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const ForgotPassword = ({ history }) => {

    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    const handleForgotPassword = async e => {
        e.preventDefault()


        const config = {
            handleCodeInApp: true,
            url: 'http://localhost:3000/login'
        }
        if (email !== null) {
            setLoading(true)
            await auth.sendPasswordResetEmail(email, config).then(() => {
                setEmail("")
                setLoading(false)
                setAlert("Link is sent to your Email!")
            }).catch(err => {
                console.log('error while sending forgot password link-->', err);
                setLoading(false)
            })
        } else {
            setAlert("Enter Email ID in field!")
        }

    }

    return (
        <div className="login-page-container">
            <div className="container shipping-form">
                <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5">Forgot Password</h2>
                    <label>Email</label>
                    <input type='email' size='large' value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email ID" />
                    <button block size='large' onClick={handleForgotPassword} className='form-button btn-block my-3' disabled={loading} >Send Link</button>
                    {alert !== null && <Alert variant="dark" className="text-white">{alert}</Alert>}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword



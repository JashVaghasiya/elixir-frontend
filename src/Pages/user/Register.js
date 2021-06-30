import React, { useState } from 'react'
import { auth } from '../../firebase/firebase'
import '../../App.css'
import { Alert } from 'react-bootstrap'


const Register = () => {

    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    window.scrollTo(0, 0)

    const submitHandler = async () => {
        if (email !== null && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setLoading(true)

            const config = {
                url: "http://localhost:3000/registration/complete",
                handleCodeInApp: true
            }

            await auth.sendSignInLinkToEmail(email, config)
            setLoading(true)
            window.localStorage.setItem('email', email)

            setEmail('')
            setAlert("Registration link has been sent!")
        } else {
            setAlert("Enter Valid Email!")
        }

    }

    return (
        <div className="login-page-container">
            <div className=" container shipping-form ">
                <div style={{ height: "85vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5">Register</h2>
                    <label>Email</label>
                    <input placeholder='Enter Email' name='txtEmail' size='large' onChange={e => setEmail(e.target.value)} disabled={loading} />
                    <button onClick={() => submitHandler()} className="form-button my-3 btn-block" disabled={loading}>{loading ? "Loading..." : 'Send Link'}</button>
                    {alert !== null && <Alert variant="dark" className="text-white">{alert}</Alert>}
                </div>
            </div>
        </div>
    )
}

export default Register

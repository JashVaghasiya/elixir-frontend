import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'

const RegistrationComplete = ({ history }) => {

    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [fName, setFName] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [ifsc, setIFSC] = useState(null)
    const [bank, setBank] = useState(null)
    const [address, setAddress] = useState(null)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (window.localStorage.getItem('email') == null) {
            history.push("/seller/registration")
        }
        setEmail(window.localStorage.getItem('email'))
    }, [history])

    const submitHandler = async () => {

        if (email === null || ifsc === null || mobile === null || fName === null || bank === null || address === null) {
            if (email === null) {
                setError('Please Try Again Sometime!')
            }
            if (ifsc === null) {
                setError('Please Provide IFSC Code!')
            }
            if (mobile === null || mobile.length < 10) {
                setError('Please Provide Mobile Number!')
            }
            if (fName === null) {
                setError('Please Provide Full Name!')
            }
            if (bank === null & bank.length < 11) {
                setError('Please Provide Bank Name!')
            }
            if (address === null) {
                setError('Please Provide Address!')
            }
            if (password === null && password.length <= 8) {
                setError('Password must be greater than 8 character!')
            }
        }
        else {
            const url = window.location.href
            dispatch({
                type: 'SET_SELLER',
                payload: {
                    email: email,
                    name: fName,
                    ifsc: ifsc,
                    mobile: mobile,
                    bank: bank,
                    address: address,
                    password: password,
                    url: url,
                }
            })
            history.push('/payment/package')
        }
    }

    return (
        <div className="doctor-login-container  pt-5">
            <div className="container shipping-form">
                <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2>Complete Seller Register</h2>
                    <label className="float-left mt-2">Email</label>
                    <input name="txtEmail" size='large' value={email} className='mt-2' disabled />
                    <label className="float-left mt-2">Full Name</label>
                    <input name="txtFName" size='large' value={fName} className='mt-2' onChange={e => setFName(e.target.value)} placeholder="Enter your FullName" />
                    <label className="float-left mt-2">Address</label>
                    <input name="txtAddress" size='large' value={address} className='mt-2' onChange={e => setAddress(e.target.value)} placeholder="Enter your Address" />
                    <label className="float-left mt-2">Mobile No.</label>
                    <input name="txtMobile" size='large' value={mobile} maxlength="10" className='mt-2' onChange={e => setMobile(e.target.value)} placeholder="Enter your Mobile Number" />
                    <label className="float-left mt-2">Bank A/C</label>
                    <input name="txtBankACNo" size='large' value={bank} maxlength="11" className='mt-2' onChange={e => setBank(e.target.value)} placeholder="Enter your Bank Account Number" />
                    <label className="float-left mt-2">IFSC</label>
                    <input name="txtIFSC" size='large' value={ifsc} maxlength="11" className='mt-2' onChange={e => setIFSC(e.target.value)} placeholder="Enter your IFSC Code" />
                    <label className="float-left mt-2">Password</label>
                    <input type="password" name="txtPassword" size='large' value={password} className='mt-2' onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                    <button onClick={() => submitHandler()} className='form-button btn-block mt-3'>Register</button>
                    {error !== null ? <Alert className="mt-3" variant="danger">{error}</Alert> : ''}
                </div>
            </div>
        </div>
    )
}

export default RegistrationComplete
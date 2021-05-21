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
            if (mobile === null) {
                setError('Please Provide Mobile Number!')
            }
            if (fName === null) {
                setError('Please Provide Full Name!')
            }
            if (bank === null) {
                setError('Please Provide Bank Name!')
            }
            if (address === null) {
                setError('Please Provide Address!')
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
                    <input name="txtMobile" size='large' value={mobile} className='mt-2' onChange={e => setMobile(e.target.value)} placeholder="Enter your Mobile Number" />
                    <label className="float-left mt-2">Bank A/C</label>
                    <input name="txtBankACNo" size='large' value={bank} className='mt-2' onChange={e => setBank(e.target.value)} placeholder="Enter your Bank Account Number" />
                    <label className="float-left mt-2">IFSC</label>
                    <input name="txtIFSC" size='large' value={ifsc} className='mt-2' onChange={e => setIFSC(e.target.value)} placeholder="Enter your IFSC Code" />
                    <label className="float-left mt-2">Password</label>
                    <input name="txtPassword" size='large' value={password} className='mt-2' onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                    <button onClick={() => submitHandler()} className='form-button btn-block mt-3'>Register</button>
                    {error !== null ? <Alert className="mt-3" variant="danger">{error}</Alert> : ''}
                </div>
            </div>
        </div>
    )
}

export default RegistrationComplete

// dispatch({
//     type: 'SET_SELLER',
//     payload: {
//       email: res.data.email,
//       name: res.data.name,
//       role: res.data.role,
//       token: idToken,
//       remainingDays: res.data.remainingDays,
//       package: res.data.package,
//       remainingProducts: res.data.remainingProducts,
//       totalProducts: res.data.totalProducts,
//       cart: res.data.cart,
//       wishlist: res.data.wishlist,
//       _id: res.data._id
//     }
//   })


// var https = require('follow-redirects').https;
// var fs = require('fs');

// var options = {
//   'method': 'GET',
//   'hostname': 'https://api.quicko.com',
//   'path': '/bank/HDFC0000001/accounts/12345678912/verify?name=JOHN%20DOE&mobile=9999999999',
//   'headers': {
//     'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKclpYbGZiR2wyWlY5QlpHVXFLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtsVjRjeUlzSW1Gd2FWOXJaWGtpT2lKclpYbGZiR2wyWlY5QlpHVXFLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtsVjRjeUlzSW1semN5STZJbUZ3YVM1eGRXbGphMjh1WTI5dElpd2laWGh3SWpveE5Ua3dPVFk1TmpBd0xDSnBiblJsYm5RaU9pSlNSVVpTUlZOSVgxUlBTMFZPSWl3aWFXRjBJam94TlRVNU16UTNNakF3ZlEueHNmYkhQTERFRlRvTy1OUWdaUUpLM25OUjFxdlhvWmhaOHRqS3gzSExydjZiVkJaMHpJZEZ5ai1MUTg1YnJZS0xXQnFnZHlzZ1NDSXlDUXNtV2VOYkEiLCJzdWIiOiJqb2huQGRvZS5jb20iLCJhcGlfa2V5Ijoia2V5X2xpdmVfQWRlKioqKioqKioqKioqKioqKioqKioqKioqKipVeHMiLCJpc3MiOiJhcGkucXVpY2tvLmNvbSIsImV4cCI6MTU5MTA1NjAwMCwiaW50ZW50IjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNTkwOTY5NjAwfQ.nH23CR5RHGQ0U19I_vq3vyJ_85A1a2iEMQij5QHgJQdDuS9x7FmTidsr1CQabSFF5ujE40SFxHv1gJM20TauUw',
//     'x-api-key': 'key_live_Ade**************************Uxs',
//     'x-api-version': '3.3'
//   },
//   'maxRedirects': 20
// };

// var req = https.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function (chunk) {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });

//   res.on("error", function (error) {
//     console.error(error);
//   });
// });

// req.end();



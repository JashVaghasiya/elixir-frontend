import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Spin } from 'antd'
import { Col, Container, Row } from 'react-bootstrap'
import { auth } from '../../firebase/firebase'
import { createUser } from '../../functions/user'
import { useDispatch, useSelector } from 'react-redux'
import { createSeller } from '../../functions/seller'


const RegistrationComplete = ({ history }) => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [mobile, setMobile] = useState('')
    const [ifsc, setIFSC] = useState('')
    const [bank, setBank] = useState('')

    const packageData = useSelector(state => state.package)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const url = window.location.href

    useEffect(() => {
        setEmail(window.localStorage.getItem('email'))
    }, [])

    const submitHandler = async () => {
        const data = { ifsc, mobile, fName, bank }
        await createSeller(data).then(res => {
            console.log(res);
        })
    }


    return (
        <Container fluid>
            <Row className="mt-5">
                <Col sm="6" md="6" lg="4" className='mt-5'>
                    <Form className='mt-5'>
                        <h1>Complete Seller Register</h1>
                        <Input name="txtEmail" size='large' value={email} className='mt-2' disabled />
                        <Input name="txtMobile" size='large' value={mobile} className='mt-2' onChange={e => setMobile(e.target.value)} placeholder="Enter your Mobile Number" />
                        <Input name="txtBankACNo" size='large' value={bank} className='mt-2' onChange={e => setBank(e.target.value)} placeholder="Enter your Bank Account Number" />
                        <Input name="txtFName" size='large' value={fName} className='mt-2' onChange={e => setFName(e.target.value)} placeholder="Enter your FullName" />
                        <Input name="txtIFSC" size='large' value={ifsc} className='mt-2' onChange={e => setIFSC(e.target.value)} placeholder="Enter your IFSC Code" />
                        <Input name="txtPassword" size='large' value={password} className='mt-2' onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                        <Button type="primary" onClick={submitHandler} className='mt-3' block disabled={loading}>{loading ? <Spin /> : 'Register'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
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



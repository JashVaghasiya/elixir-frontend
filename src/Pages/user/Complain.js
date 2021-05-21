import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { createComplain } from '../../functions/complain'
import { sendComplain } from '../../functions/email'
import { Alert, Container } from 'react-bootstrap'

const Complain = ({ history }) => {

    const user = useSelector(state => state.user)
    const [orderId, setOrderId] = useState('')
    const [productName, setProductName] = useState('')
    const [complain, setComplain] = useState('')
    const [alert, setAlert] = useState(null)
    window.scrollTo(0, 0)
    const submitHandler = async () => {
        if (orderId.length > 24 || orderId.length < 24) {
            setAlert("Enter Valid Order Id")
        } else {
            await createComplain(orderId, productName, complain, user && user._id, user.token).then(res => {
                if (res.data.notFound) {
                    setAlert(res.data.notFound)
                } else {
                    sendComplain(user && user.email, productName, res.data._id, complain)
                    history.push('/user/list/complain')
                }
            }).catch(err => {
                console.log(err)
            })
        }
        setTimeout(() => {
            setAlert(null)
        }, 5000)
    }

    return (

        <Container>
            <h2 className="my-4">Make Complain</h2>
            <hr />
            <div className="justify-content-md-center shipping-form">
                <label className="float-left mt-2">Order ID</label>
                <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} maxLength={24} placeholder="Copy Order ID from Order History" />
                <label className="float-left mt-2">Product Name</label>
                <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter Product Name" />
                <label className="float-left mt-2">Complain</label>
                <textarea rows='4' value={complain} onChange={e => setComplain(e.target.value)} placeholder="Enter Complain"></textarea>
            </div>
            {alert === null ? '' : <Alert className="mt-3" variant="warning">{alert}</Alert>}
            <button className="my-3 form-button" onClick={() => submitHandler()}>Make Complain</button>

        </Container>
    )
}

export default Complain

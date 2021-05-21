import React, { useEffect, useState } from 'react'
import Success from '../../images/success.gif'
import '../../css/PaymentSuccess.css'
import { useSelector } from 'react-redux'
import { getOrder } from '../../functions/order'
const PaymentSuccess = ({ match }) => {

    const user = useSelector(state => state.user)
    const [order, setOrder] = useState()

    useEffect(() => {
        if (user && match.params.id) {
            getOrder(match.params.id, user && user.token).then(res => {
                setOrder(res.data.order)
            }).catch(err => {
                console.log(err)
            })
        }

    }, [match, user])



    return (
        <div className="main-content">
            <img style={{ width: "400px", height: "300px" }} src={Success} alt="Success" />
            <h2 className="success-text">Payment Successful</h2>
            <h4 className="link-text">Download Your Invoice from below link</h4>
            <a className="form-button my-3" href={order && order.invoiceURL} download><i class="fas fa-arrow-circle-down"></i> Download Invoice</a>
        </div>
    )
}

export default PaymentSuccess

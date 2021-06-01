/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { createOrderPayment } from '../../../functions/stripe'
import '../../../css/OrderPayment.css'
import { Link, useHistory } from 'react-router-dom'
import { Alert, Card, Col, ListGroup, Row } from 'react-bootstrap'
import CreateInvoice from '../invoice/CreateInvoice'
import OrderProgressBar from '../OrderProgressBar'
import Loader from '../../../components/Loader'

const StripeCheckOut = () => {

    const [processingOrder, setProcessingOrder] = useState(false)
    const [succeed, setSucceed] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory()
    const [transactionId, setTransactionId] = useState()
    const user = useSelector(state => state.user)
    let order = null
    order = useSelector(state => state.order)
    const [created, setCreated] = useState(false)
    const orderSplit = order && order.address.split(",")

    useEffect(() => {
        window.scrollTo(0, 0)
        if (order === null) {
            history.push('/user/cart')
        }
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, order, history])

    window.onbeforeunload = () => {
        console.log("Cant-reload")
    }
    const load = async () => {
        await createOrderPayment(user && user.token, order && order.payableAmount).then(res => {
            console.log(res.data)
            setClientSecret(res.data.clientSecret)
        })
    }


    const stripe = useStripe()
    const elements = useElements()

    const cartStyle = {
        style: {
            base: {
                color: "#1a1a1a",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#1a1a1a",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    const handleSubmit = async (e) => {
        setEmail(user && user.email)
        e.preventDefault()
        setProcessing(true)

        await stripe.confirmCardPayment(clientSecret && clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            }
        }).then(res => {
            setError(null)
            setProcessing(false)
            setSucceed(true)
            setTransactionId(res.paymentIntent.id)
        }).catch(error => {
            console.log('payment error', error)
        })
    }

    const handleChange = async (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    return (
        <>
            <OrderProgressBar status="payment" />
            <div className="payment-screen">
                <div className="order-payment">
                    <div className="order-list">
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="mt-5 mr-5 order-address" style={{ padding: 0, border: "none" }}>
                                <h4>
                                    SHIPPING DETAILS
                                </h4>
                                <hr />
                                <h6><strong>Email: </strong>{user && user.email}</h6>
                                <div className="checkout-address">
                                    <div>
                                        <h6><strong>Address: </strong></h6>
                                    </div>
                                    <div>
                                        <h6>{orderSplit && orderSplit[0]},</h6>
                                        <h6>{orderSplit && orderSplit[1]},</h6>
                                        <h6>{orderSplit && orderSplit[2]},</h6>
                                        <h6>{orderSplit && orderSplit[3]}</h6>
                                    </div>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item className="mt-4 mr-5" style={{ padding: 0 }}>
                                <h4>ITEMS</h4>
                                <hr />
                                {order && order.cart.length === 0 ? <Alert>Your cart is empty!</Alert> : (
                                    <ListGroup variant='flush'>
                                        {order && order.cart.map((item, index) => (
                                            <ListGroup.Item style={{ padding: 0, border: "none" }} key={index}>
                                                <div className="list-item">
                                                    <div className="img">
                                                        <img src={item.productId.images[0].url} alt={item.productId.images[0].name} fluid rounded />
                                                    </div>
                                                    <div className="name">
                                                        <Link to={`/product/${item.product}`}><p style={{ color: "black", fontSize: "15px", marginLeft: "10px" }}>{item.productId.name.length > 80 ? item.productId.name.substr(0, 80).concat("...") : item.productId.name}</p></Link>
                                                    </div>
                                                    <div className="amount">
                                                        <p style={{ color: "black", fontSize: "15px", marginLeft: "10px" }}>{item.qty} x ₹{item.productId.price} = ₹{item.qty * item.productId.price}</p>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="order-summary mt-5 mb-5">
                        {processingOrder ? <Loader /> :

                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>ORDER SUMMERY</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><h5>Items ({order && order.cart.length > 0 && order.cart.reduce((acc, item) => acc + item.qty, 0)})</h5></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Discounted Amount:</Col>
                                            <Col>{order && order.discountedAmount}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping Charges:</Col>
                                            <Col>{order && order.shippingCharges}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>{order && order.taxAmount}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>PayableAmount: </Col>
                                            <Col> {order && order.payableAmount}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                                            <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
                                            <button className="stripe-button form-button" disabled={processingOrder || processing || disabled || succeed}><span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : <div>Pay ₹{order && order.payableAmount}</div>}</span></button>
                                        </form>
                                        {transactionId && !created && <CreateInvoice history={history} setCreated={setCreated} setProcessingOrder={setProcessingOrder} transactionId={transactionId} />}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {error && <Alert variant='danger'>{error}</Alert>}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default StripeCheckOut

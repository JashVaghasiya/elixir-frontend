import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../../functions/stripe'
import { getPack } from '../../functions/package'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { createSeller, updateSellerPackage } from '../../functions/seller'
import { Alert, Card, Col, ListGroup, Row } from 'react-bootstrap'

const StripeCheckOut = () => {

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [email, setEmail] = useState('')
    const [pack, setPack] = useState([])
    const history = useHistory()

    const user = useSelector(state => state.user)
    const data = useSelector(state => state.seller)
    const dispatch = useDispatch()
    const addressSplit = user && user.address.split(",")

    useEffect(() => {
        getPackage()
        load()
        setEmail(window.localStorage.getItem('email'))
    }, [])

    const getPackage = async () => {
        const packageId = window.localStorage.getItem("Package Id")
        await getPack(packageId).then(res => {
            console.log(res.data)
            setPack(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const load = async () => {
        await createPaymentIntent(500).then(res => {
            console.log("create payment intent", res.data)
            setClientSecret(res.data.clientSecret)
        })
    }



    const stripe = useStripe()
    const elements = useElements()

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
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
        }).then(async res => {
            if (res.error) {
                setError(`payment failed`, res.error.message)
                setProcessing(false)
            } else {
                setError(null)
                setProcessing(false)
                setSucceeded(true)
                if (res.paymentIntent.status === "succeeded") {

                    if (user && user._id && user.token && user.role === "seller") {
                        await updateSellerPackage(user && user._id, pack && pack, user && user.token).then(res => {
                            dispatch({
                                type: 'LOGIN_USER',
                                payload: null
                            })
                            if (res) {
                                history.push('/login')
                                window.localStorage.removeItem("Package Id")
                            }
                        })
                    } else {
                        const result = await auth.signInWithEmailLink(email, data && data.url)
                        if (result.user.emailVerified) {
                            window.localStorage.removeItem('email')

                            let user = auth.currentUser
                            await user.updatePassword(data.password)
                            const idToken = await user.getIdTokenResult()
                            console.log('calling create seller')
                            await createSeller(data && data, pack && pack, idToken.token).then(res => {
                                console.log(res)
                                dispatch({
                                    type: 'LOGIN_USER',
                                    payload: {
                                        name: res.data.name,
                                        email: res.data.email,
                                        token: idToken.token,
                                        role: res.data.role,
                                        _id: res.data._id,
                                        package: res.data.package,
                                        remainingProducts: res.data.remainingProducts,
                                        totalProducts: res.data.totalProducts,
                                    }
                                })
                                history.push('/seller/dashboard')
                                window.localStorage.removeItem("Package Id")
                            }).catch(error => console.log(error))
                        } else {
                            console.log('error in seller signup')
                        }
                    }

                } else {
                    setError('payment failed', res.paymentIntent.status)
                }

            }

        })


    }

    const handleChange = async (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    return (
        <>
            <div className="payment-screen">
                <div className="order-payment">
                    <div className="order-list">
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="mt-5 mr-5 order-address" style={{ padding: 0, border: "none" }}>
                                <h4>
                                    USER DETAILS
                                </h4>
                                <hr />
                                {user && user.role === "seller" ?
                                    <>
                                        <h6><strong>Name: </strong>{user && user.email}</h6>
                                        <h6><strong>Price: </strong>{user && user.name}</h6>
                                        <h6><strong>Duration: </strong>{user && user.address}</h6>
                                        <div className="checkout-address">
                                            <div>
                                                <h6><strong>Address: </strong></h6>
                                            </div>
                                            <div>
                                                <h6>{addressSplit && addressSplit[0]},</h6>
                                                <h6>{addressSplit && addressSplit[1]},</h6>
                                                <h6>{addressSplit && addressSplit[2]},</h6>
                                                <h6>{addressSplit && addressSplit[3]}</h6>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <h6><strong>Email: </strong>{data && data.email}</h6>
                                }

                            </ListGroup.Item>
                            <ListGroup.Item className="mt-5 mr-5 order-address" style={{ padding: 0, border: "none" }}>
                                <h4>
                                    PACKAGE DETAILS
                                </h4>
                                <hr />

                                <h6><strong>Name: </strong>{pack && pack.name}</h6>
                                <h6><strong>Price: </strong>{pack && pack.price}</h6>
                                <h6><strong>Duration: </strong>{pack && pack.duration}</h6>
                                <h6><strong>Ads Rate: </strong>{pack && pack.adsRate}</h6>
                                <h6><strong>Products: </strong>{pack && pack.products}</h6>

                            </ListGroup.Item>


                        </ListGroup>
                    </div>
                    <div className="order-summary mt-5 mb-5">


                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>PAYMENT SUMMERY</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><h5>Item (1)</h5></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Discounted Amount:</Col>
                                        <Col>{pack && ((pack.previousPrice) - (pack.price)).toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>Included In Price</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>PayableAmount: </Col>
                                        <Col> {pack && pack.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                                        <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
                                        <button className="stripe-button" disabled={processing || disabled || succeeded}><span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : <div>Pay ₹{pack.price}</div>}</span></button>
                                        <br />
                                        {error && <div className="card-error" role="alert">{error}</div>}
                                        {succeeded && <div className="card-error" role="alert">Payment Successed</div>}
                                    </form>

                                </ListGroup.Item>
                                {error &&
                                    <ListGroup.Item>
                                        <Alert variant='danger'>{error}</Alert>
                                    </ListGroup.Item>
                                }
                            </ListGroup>
                        </Card>

                    </div>
                </div>

            </div>


        </>
    )
}

export default StripeCheckOut

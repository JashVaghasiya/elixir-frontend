import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { createAdsPayment } from '../../../../functions/stripe'
import { createAd } from '../../../../functions/ads'
import { getAdsProduct } from '../../../../functions/product'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

const StripeCheckOut = ({ id }) => {

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [product, setProduct] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState('')
    const history = useHistory()


    const user = useSelector(state => state.user)
    const seller = useSelector(state => state.user)
    const productId = useSelector(state => state.ads.productId)
    const sellerId = useSelector(state => state.ads.sellerId)
    const days = useSelector(state => state.ads.days)
    const ads = useSelector(state => state.ads)

    useEffect(() => {

        if (user && user.token) {
            load()
        }

        const loadProduct = async () => {
            await getAdsProduct(id && id, user && user.token).then(res => {
                setProduct(res.data)
            }).catch(error => {
                console.log(error)
            })
        }

        return loadProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const load = async () => {
        await createAdsPayment(user && user.token, ads && ads.amountPaid).then(res => {
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
            receipt_email: user.email,
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            }
        }).then(res => {
            if (res.error) {
                setError(`payment failed`, res.error.message)
                setProcessing(false)
            } else {
                setError(null)
                setProcessing(false)
                setSucceeded(true)
                console.log(res)
                createAd(productId, sellerId, days, ads && ads.amountPaid, seller && seller.token).then(res => {
                    history.push('/seller/products')
                }).catch(error => {
                    console.log('error while creating ad', error)
                })
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

                <div className="order-payment" style={{ marginTop: 25 }}>
                    <div className="order-list">

                        <ListGroup variant='flush'>
                            <h2 className="mt-5">Ads Payment <i class="ml-3 fas fa-ad"></i></h2>
                            <ListGroup.Item className="mt-4 mr-5" style={{ padding: 0 }}>
                                <h4>ITEMS</h4>
                                <hr />
                                {product &&
                                    <>
                                        <ListGroup.Item key={product._id} className="shipping-form cart-section-1">
                                            <Row>
                                                <Col md={2}>
                                                    <Image className="cart-image" src={product.images[0].url} alt={product.images[0].name} fluid rounded />
                                                </Col>
                                                <Col md={6}>
                                                    <Link to={`/product/${product._id}`}><p className="text-dark">{product.name.length > 30 ? product.name.substr(0, 50).concat("...") : product.name}</p></Link>
                                                </Col>
                                                <Col md={2} style={{ "fontSize": "18px" }}>&#8377;{product.price}</Col>

                                            </Row>
                                        </ListGroup.Item>
                                    </>
                                }
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
                                        <Col>Days</Col>
                                        <Col>{ads && ads.days}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Ads Charge:</Col>
                                        <Col>{ads && ads.adsAmount}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Amount To Pay:</Col>
                                        <Col>{ads && ads.amountPaid}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                                        <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
                                        <button className="stripe-button" disabled={processing || disabled || succeeded}><span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : <div>Pay ₹{ads && ads.amountPaid}</div>}</span></button>
                                        <br />
                                        {error && <div className="card-error" role="alert">{error}</div>}
                                        {succeeded && <div className="card-error" role="alert">Payment Successed</div>}

                                    </form>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                </div>

            </div >
        </>
    )
}



export default StripeCheckOut

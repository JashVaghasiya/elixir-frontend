import React, { useEffect, useState } from 'react'
import { listCart, removeFromCart, updateProductQty } from '../../functions/cart'
import { getCoupon, applyCoupon } from '../../functions/coupon'
import { Row, Col, ListGroup, Image, Button, Card, Container, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import EmptyCart from '../../images/cart.gif'
import '../../css/Cart.css'
import Loader from '../../components/Loader'

const Cart = ({ history }) => {

    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState([])
    const [coupon, setCoupon] = useState(null)
    const [couponId, setCouponId] = useState('')
    const [discount, setDiscount] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()


    let shippingCharges = 0
    let taxAmount = 0
    let payableAmount = 0
    let totalAmount = 0
    let qty = 0
    let discountedAmount = 0


    useEffect(() => {
        window.scrollTo(0, 0)
        if (user && user.token) {
            getCart()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getCart = async () => {
        setLoading(true)
        await listCart(user && user._id, user && user.token).then(res => {
            setCart(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
        cart && cart.length > 0 && cart.forEach(c => {
            if (c.productId.stock <= 0 || c.productId.activated === false) {
                setDisabled(true)

            }
        })
    }

    const setCartQty = (e, cartId) => {
        updateQty(e.target.value, cartId)
    }

    const updateQty = async (value, cartId) => {
        await updateProductQty(cartId, value, user && user.token).then(res => {
            getCart()
        }).catch(error => {
            console.log(error)
        })
    }

    const fetchCoupons = async () => {
        await getCoupon(coupon, user && user.token).then(res => {
            if (res.data.notFound) {
                setError(res.data.notFound)
            } else {
                setError(null)
                setDiscount(res.data.discount)
                setCouponId(res.data._id)
                applyCoupon(res.data._id, user && user._id, user && user.token).then(res => {
                    if (res.data.used) {
                        setError(res.data.used)
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(error => {
            console.log('error', error)
        })

    }

    const removeProduct = async (id) => {
        await removeFromCart(id, user.token).then(res => {
            getCart()
        }).catch(error => {
            console.log(error)
        })
    }

    const placeOrder = async () => {

        qty = cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty, 0)
        totalAmount = Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(2))
        discountedAmount = Number((totalAmount * discount / 100).toFixed(2))
        taxAmount = Number((totalAmount * 12 / 100).toFixed(2))
        shippingCharges = Number(totalAmount > 500 ? 0 : 40)
        payableAmount = Number(((totalAmount - discountedAmount) + (shippingCharges + taxAmount)).toFixed(0))

        dispatch({
            type: 'SET_ORDER',
            payload: {
                cart: cart,
                totalAmount: totalAmount,
                discountedAmount: discountedAmount,
                taxAmount: taxAmount,
                shippingCharges: shippingCharges,
                payableAmount: payableAmount,
                couponId: couponId || null,
                qty: qty,
                discount: discount || 0
            }
        })

        history.push('/user/shipping')

    }

    return (

        <Container className="cart-container">


            {loading ? <Loader /> : cart && cart.length <= 0 ? (


                <div className="empty-cart">
                    <img style={{ width: "300px", height: "300px" }} src={EmptyCart} alt="Empty-Cart" />
                    <h2 className="empty-text">Your Cart is Empty!</h2>
                    <Link to="/" className="form-button my-3">Go Back</Link>
                </div>

            ) : (
                <Row>
                    <Col md={8} >
                        <h1 className="page-heading" style={{ marginTop: "20px" }} >SHOPPING CART</h1>
                        <ListGroup variant='flush' style={{ "margin-top": "30px" }}>
                            {cart && cart.length > 0 && cart.map(item => (
                                <>
                                    <ListGroup.Item key={item._id} className="shipping-form cart-section-1">
                                        <Row>
                                            <Col md={2}>
                                                <Image className="cart-image" src={item.productId.images[0].url} alt={item.productId.images[0].name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.productId._id}`}><p className="text-dark">{item.productId.name.length > 30 ? item.productId.name.substr(0, 50).concat("...") : item.productId.name}</p></Link>
                                            </Col>
                                            <Col md={2} style={{ "fontSize": "18px" }}>&#8377;{item.productId.price}</Col>
                                            <Col md={2}>
                                                {
                                                    item.productId.stock <= 0 ? "Out of Stock" : item.productId.activated === false ? "Unavailable" :

                                                        <select value={item.qty} onChange={(e) => setCartQty(e, item._id)}>
                                                            {
                                                                item.productId.stock > 5 ? [...Array(5).keys()].map(q => (
                                                                    <option selected={q + 1 === item.qty} key={q + 1} value={q + 1} >{q + 1}</option>
                                                                )) : [...Array(item.productId.stock).keys()].map(q => (
                                                                    <option selected={q + 1 === item.qty} key={q + 1} value={q + 1} >{q + 1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                }
                                            </Col>
                                            <Col md={2}>
                                                <Button type="button" variant="light" onClick={() => removeProduct(item._id)}><i className='fas fa-trash'></i></Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4} style={{ "margin-top": "100px" }}>
                        <Card>
                            <ListGroup variant='flush' >
                                <ListGroup.Item className="cart-section-2">
                                    <h3>Items ({cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty, 0)})</h3>
                                    <hr />
                                    <p>  Total Amount: {Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(0))}</p>
                                    <hr />
                                    <p>- Discount: {Number((Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed()) * discount / 100).toFixed(0))}</p>
                                    <hr />
                                    <p>+ Shipping Charges: {Number(Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(0)) > 500 ? 0 : 40)}</p>
                                    <hr />
                                    <p>+ Tax Amount: {Number((Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(0)) * 12 / 100).toFixed(0))}</p>
                                    <hr />
                                    <p style={{ fontWeight: "600" }}>  Payable Amount: {Number(((Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(0)) - Number((Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(0)) * discount / 100).toFixed(0))) + (Number(Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(2)) > 500 ? 0 : 40) + Number((Number(cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(2)) * 12 / 100).toFixed(2)))).toFixed(0))}</p>
                                    <hr />
                                    <div className="apply-coupon">
                                        <input type="text" name="coupon" placeholder="Coupon Name" onChange={(e) => setCoupon(e.target.value)} />
                                        <button type='button' className='form-button-small' disabled={disabled} onClick={() => fetchCoupons()}>APPLY</button>
                                    </div>
                                    <button type='button' className='form-button btn-block' disabled={disabled} onClick={() => placeOrder()}>PROCEED TO CHECKOUT</button>
                                    {discount && error === null && <Alert variant='dark' className="text-white mt-3">{`You have received ${discount}% discount`}</Alert>}
                                    {error !== null && <Alert variant='dark' className="text-white mt-3">{error}</Alert>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                </Row>
            )}
        </Container>
    )
}

export default Cart


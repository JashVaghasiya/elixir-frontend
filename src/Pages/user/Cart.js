import React, { useEffect, useState } from 'react'
import { listCart, removeFromCart, updateProductQty } from '../../functions/cart'
import { createOrder } from '../../functions/order'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {

    const user = useSelector(state => state.user)
    const [qty, setQty] = useState(0)
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        getCart()
    }, [user])

    const getCart = async () => {
        setLoading(true)
        await listCart(user && user._id, user && user.token).then(res => {
            setCart(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const setCartQty = (e, cartId) => {
        updateQty(e.target.value, cartId)
    }

    const updateQty = async (value, cartId) => {
        await updateProductQty(cartId, value, user && user.token).then(res => {
            console.log('qty updated', res.data)
            getCart()
        }).catch(error => {
            console.log(error)
        })
    }

    const removeProduct = async (id) => {
        console.log(id)
        await removeFromCart(id, user.token).then(res => {
            console.log('removed product', res.data)
            getCart()
        }).catch(error => {
            console.log(error)
        })
    }

    const placeOrder = async () => {
        console.log(cart)
        const qty = cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty, 0)
        const amount = cart && cart.length > 0 && cart.reduce((acc, item) => (acc + item.qty * item.productId.price), 0).toFixed(2)

        createOrder(cart, qty, amount, user && user._id, user && user.token).then(res => {
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="container-fluid">
            <Col>
                {user && cart && cart.length > 0 ? cart.map(product => (
                    <div style={{ display: "flex", background: "white", borderBottom: "2px black solid", padding: "10px", margin: "20px" }}>
                        <img class="card-img-top" style={{ height: "100%", width: "20%" }} src={product.productId.images[0].url} alt={product.productId.images[0].name} />
                        <div class="card-body">
                            <Link to={`/product/${product.productId._id}`} style={{ fontSize: "30px" }}>{product.productId.name.length > 20 ? product.productId.name.substring(0, 20).concat("...") : product.productId.name}</Link>
                            <p class="card-text black">{product.productId.description.substring(0, 65).concat("...")}</p>
                            <p style={{ color: "black" }}>{product.qty * product.productId.price}</p>
                            <strong>Quantity</strong>
                            <select onChange={(e) => setCartQty(e, product._id)} className="form-control mt-2" style={{ width: "100px" }}>
                                {

                                    [...Array(5).keys()].map(q => (
                                        <option selected={q + 1 === product.qty} key={q + 1} value={q + 1} >{q + 1}</option>
                                    ))
                                }
                            </select>
                            <button style={{ border: "none", padding: "7px", background: "black", color: "white", marginTop: "10px" }} onClick={() => removeProduct(product._id)}>Remove</button>

                        </div>
                    </div>
                )) : <p style={{ color: "black" }}>Cart is Empty</p>}
                <h2>Subtotal ({cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                ₹{cart && cart.length > 0 && cart.reduce((acc, item) => acc + item.qty * item.productId.price, 0).toFixed(2)}
            </Col>
            <button style={{ border: "none", padding: "10px", background: "white" }} onClick={() => placeOrder()}>Place Order</button>
        </div>
    )
}

export default Cart

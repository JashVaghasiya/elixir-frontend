import React, { useEffect, useState } from 'react'
import { getCurrentUser, listCart } from '../../functions/user'
import { Col, Row } from 'react-bootstrap'
import UserProductCard from '../../components/cards/UserProductCard'
import { useSelector } from 'react-redux'

const Cart = () => {

    const user = useSelector(state => state.user)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            setLoading(true)
            getCart()
        }
    }, [user])

    const getCart = async () => {
        await listCart(user._id, user.token).then(res => {
            console.log(res.data);
            setProducts(res.data);
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <Row>
                {loading ? <p className="m-5">Loading...</p> : products && products.map(product => (
                    <Col><UserProductCard product={product} /></Col>
                ))}
            </Row>
        </>
    )
}

export default Cart

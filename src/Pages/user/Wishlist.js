import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { getCurrentUser, listWishlist } from '../../functions/user'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EyeOutlined } from '@ant-design/icons'
import UserProductCard from '../../components/cards/UserProductCard'
import { Col, Row } from 'react-bootstrap'
const { Meta } = Card;

const Wishlist = () => {

    const user = useSelector(state => state.user)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            setLoading(true)
            getWishlist()
        }
    }, [user])

    const getWishlist = async () => {
        await listWishlist(user.token).then(res => {
            setProducts(res.data.wishlist);
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <Row>
                {loading ? <p className="m-5">Loading...</p> : user && products.map(product => (
                    <Col><UserProductCard key={product._id} product={product} /></Col>
                ))}
            </Row>
        </>
    )
}

export default Wishlist

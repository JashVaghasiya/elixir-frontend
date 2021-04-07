import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { getCurrentUser } from '../../functions/user'
import { listWishlist, removeWishlist } from '../../functions/wishlist'
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
            console.log(res.data.wishlist)
            console.log(products)
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    const removeProduct = async (id) => {
        console.log(id)
        await removeWishlist(id, user._id, user.token).then(res => {
            console.log('removed product', res.data)
            getWishlist()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="container-fluid">
            <Row>
                {loading ? <p style={{ color: "black" }}>Loading...</p> : user && products.map(product => (
                    <UserProductCard key={product._id} product={product} removeProduct={removeProduct} />
                ))}
            </Row>
        </div>


    )
}

export default Wishlist

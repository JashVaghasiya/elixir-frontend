import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getRejectedProduct } from '../../../functions/product'
import HomeProductCard from '../../../components/cards/HomeCard'
import SellerSideNav from '../../../components/nav/Seller'
import { Col, Row } from 'react-bootstrap'
import SellerHeader from '../../../components/nav/HeaderMain'
import ProductHeader from '../header/ProductHeader'
import Loader from '../../../components/Loader'

const Rejected = () => {
    const [products, setProducts] = useState([])
    const seller = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (seller && seller.token) {
            setLoading(true)
            getRejectedProduct(seller._id, seller.token).then(res => {
                setLoading(false)
                setProducts(res.data)
            }).catch(err => {
                console.log("Error in Getting Products", err)
            })
        }
    }, [seller])
    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SellerSideNav active="product" />
                <main>
                    <div className="main__container">
                        <ProductHeader activated="rejected" />
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {
                                    seller && products && products.length > 0 ? products.map(p => (
                                        <Col sm={12} md={6} lg={4} xl={3}>
                                            <HomeProductCard product={p} />
                                        </Col>
                                    )) : <p className="m-3 text-white">No Deactivated Products</p>
                                }
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Rejected


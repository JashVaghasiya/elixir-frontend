import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { activateProduct, getDeactivatedProducts } from '../../../functions/product'
import ActivationCard from '../../../components/cards/ActivationCard'
import SellerSideNav from '../../../components/nav/Seller'
import { Alert, Col, Row } from 'react-bootstrap'
import SellerHeader from '../../../components/nav/HeaderMain'
import ProductHeader from '../header/ProductHeader'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Deactivate = () => {
    const [products, setProducts] = useState([])
    const seller = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seller])

    const getProducts = () => {
        setLoading(true)
        getDeactivatedProducts(seller && seller._id, seller && seller.token).then(res => {
            setLoading(false)
            setProducts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const activate = async () => {
        if (seller.remainingDays > 0) {
            await activateProduct(activeId, seller.token).then(res => {
                if (res) {
                    setProducts(products.filter(p => p._id !== activeId))
                }
                setActiveId("")
            })
        } else {
            setError("Renew Your Package")
        }
    }

    if (activeId) {
        activate()
        setActiveId("")
    }

    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SellerSideNav active="product" />
                <main>
                    <div className="main__container">
                        <ProductHeader activated="deactivate" />
                        {error !== null ? <Alert className="mt-3 mb-3 text-white" variant="dark">{error} !<Link className="red-link" to="/package"> Renew</Link></Alert> : null}
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {
                                    seller && products && products.length > 0 ? products.map(p => (
                                        <Col className="mb-2" sm={12} md={6} lg={4} xl={4}>
                                            <ActivationCard user={seller} p={p} setId={setActiveId} />
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

export default Deactivate
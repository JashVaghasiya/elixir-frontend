import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deactivateProduct, getActiveProducts } from '../../../functions/product'
import ActivationCard from '../../../components/cards/ActivationCard'
import SellerSideNav from '../../../components/nav/Seller'
import { Alert, Col, Row } from 'react-bootstrap'
import SellerHeader from '../../../components/nav/HeaderMain'
import ProductHeader from '../header/ProductHeader'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Activate = () => {
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
        getActiveProducts(seller && seller._id, seller && seller.token).then(res => {
            setLoading(false)
            console.log(res.data);
            setProducts(res.data)

        })
    }

    const activate = async () => {
        if (seller.remainingDays > 0) {
            await deactivateProduct(activeId, seller.token).then(res => {
                if (res) {
                    const newProducts = products.filter(p => p._id !== activeId)
                    setProducts(newProducts)
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
                <SellerSideNav />
                <main>
                    <div className="main__container">
                        <ProductHeader activated="activate" />
                        {error !== null ? <Alert className="mt-3 mb-3 text-white" variant="dark">{error}! <Link className="red-link" to="/package"> Renew</Link></Alert> : null}
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {
                                    seller && products && products.length > 0 ? products.map(p => (
                                        <Col className="mb-2" sm={12} md={6} lg={4} xl={4}>
                                            <ActivationCard user={seller} p={p} setId={setActiveId} />
                                        </Col>
                                    )) : <p className="m-3 text-white">No Activated Products</p>
                                }
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Activate
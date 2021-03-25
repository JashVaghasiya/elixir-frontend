import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { activateProduct, deactivateProduct, getActiveProducts } from '../../../functions/product'
import ActivationCard from '../../../components/cards/ActivationCard'
import SellerSideNav from '../../../components/nav/SellerSideNav'
import { Col, Row } from 'react-bootstrap'

const Activate = () => {
    const [products, setProducts] = useState([])
    const seller = useSelector(state => state.seller)
    const [loaded, setLoader] = useState(true)
    const [activeId, setActiveId] = useState("")


    useEffect(() => {
        if (loaded) {
            setLoader(false)
            getProducts()
        }
    }, [loaded])

    const getProducts = () => {

        if (seller && seller._id) {
            getActiveProducts(seller._id, seller.token).then(res => {
                console.log(res.data);
                setProducts(res.data)

            })
        }
    }

    const activate = async () => {

        await deactivateProduct(activeId, seller.token).then(res => {
            if (res) {
                const newProducts = products.filter(p => p._id !== activeId)
                setProducts(newProducts)
            }
            setActiveId("")
        })
    }

    if (activeId) {
        activate()
        setActiveId("")
    }

    return (
        <div>
            <SellerSideNav />
            <div className="page-content">
                <h3 className="mb-3">Activate Products</h3>
                <Row>
                    {
                        seller && products && products.length > 0 ? products.map(p => (
                            <ActivationCard p={p} setId={setActiveId} />
                        )) : <p className="m-3">No Activated Products</p>
                    }
                </Row>
            </div>
        </div>
    )
}

export default Activate
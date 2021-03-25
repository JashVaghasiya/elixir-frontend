import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { activateProduct, getDeactivatedProducts } from '../../../functions/product'
import ActivationCard from '../../../components/cards/ActivationCard'
import SellerSideNav from '../../../components/nav/SellerSideNav'
import { Row } from 'react-bootstrap'

const Deactivate = () => {
    const [products, setProducts] = useState([])
    const seller = useSelector(state => state.seller)
    const [activeId, setActiveId] = useState("")
    const [loaded, setLoader] = useState(true)


    useEffect(() => {
        if (loaded) {
            setLoader(false)
            getProducts()
        }
    }, [loaded])

    const getProducts = () => {

        if (seller && seller._id) {
            getDeactivatedProducts(seller._id, seller.token).then(res => {
                setProducts(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const activate = async () => {

        await activateProduct(activeId, seller.token).then(res => {
            if (res) {
                setProducts(products.filter(p => p._id !== activeId))
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
                <h3 className="mb-3">Deactivate Products</h3>
                <Row>
                    {
                        seller && products && products.length > 0 ? products.map(p => (
                            <ActivationCard p={p} setId={setActiveId} />
                        )) : <p className="m-3">No Deactivated Products</p>
                    }
                </Row>
            </div>
        </div>
    )
}

export default Deactivate
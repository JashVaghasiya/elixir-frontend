import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import ProductCard from '../../../components/cards/ProductCard'
import SideNav from '../../../components/nav/Seller'
import { deleteProduct, getSellerProducts } from '../../../functions/product'
import { checkForAds } from '../../../functions/ads'
import { Alert, Col, Row } from 'react-bootstrap'
import { getPack } from '../../../functions/package'
import ProductHeader from '../header/ProductHeader'
import SellerHeader from '../../../components/nav/HeaderMain'
import '../../../css/ProductCard.css'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Products = ({ history }) => {

    const dispatch = useDispatch()

    const seller = useSelector(state => state.user)
    const [products, setProducts] = useState()
    const [days, setDays] = useState(1)
    const [warning, setWarning] = useState(null)
    const [rate, setRate] = useState(0)
    const [ad, setAd] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSellerProducts(seller && seller._id, seller && seller.token).then(res => {
            setLoading(false)
            setProducts(res.data)
        })
        getPack(seller && seller.package).then(res => {
            setRate(res.data.adsRate)
            setAd(res.data.ads)
        }).catch(error => {
            console.log(error)
        })
    }, [seller])


    const createAds = async (p) => {
        if (seller.remainingDays < 0) {
            setError("Renew Your Package")
        } else if (!ad) {
            setError("Current package is not eligible for paid Promotion")
        } else {
            const amountPaid = Number(days * rate).toFixed(2)
            await checkForAds(p._id, p.seller, seller && seller.token).then(res => {
                if (res.data.alreadyApplied) {
                    setWarning(res.data.alreadyApplied)

                } if (res.data.notFound) {
                    dispatch({
                        type: 'SET_ADS_AMOUNT',
                        payload: {
                            adsAmount: amountPaid,
                            productId: p._id,
                            sellerId: p.seller,
                            days: days,
                            amountPaid: amountPaid,
                            rate: rate
                        }
                    })
                    history.push(`/payment/ads/${p._id}`)
                }
            }).catch(error => {
                console.log(error)
            })
        }
        setTimeout(() => {
            setWarning(null)
        }, 6000)
    }

    const deleteImage = (file) => {

        const storageRef = firebase.storage().ref('product-images/')

        for (let i = 0; i < file.length; i++) {
            const image = storageRef.child(file[i].name)
            image.delete().then(() => {
            }).catch(err => {
                console.log("Image Delete:", err)
            })
        }

    }

    const removeProduct = async (id) => {

        //finding product for delete image
        const deleteProducts = products.find(p => {
            return id === p._id
        })

        await deleteProduct(id, seller.token).then(res => {

            setProducts(products.filter(p => {
                return id !== p._id
            }))

            dispatch({
                type: 'DELETE_SELLER_PRODUCT',
                payload: products
            })
            if (res) {
                deleteImage(deleteProducts.images)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    setTimeout(() => {
        setWarning(null)
    }, 5000)

    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SideNav />
                <main>
                    <div className="main__container">
                        <ProductHeader activated="products" />
                        {warning !== null ? <Alert className="mt-3 mb-3 text-white" variant="dark">{warning}</Alert> : null}
                        {error !== null ? <Alert className="mt-3 mb-3 text-white" variant="dark">{error} !<Link className="red-link" to="/package"> Renew</Link></Alert> : null}
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {products && products.length > 0 ? products.map(p => (
                                    <Col sm={12} md={6} lg={4} xl={3}>
                                        <ProductCard p={p} seller={seller} removeProduct={() => removeProduct(p._id)} createAds={() => createAds(p)} setDays={setDays} />
                                    </Col>
                                )) : <p className="m-3 text-white">Zero Products To Sell</p>}
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Products

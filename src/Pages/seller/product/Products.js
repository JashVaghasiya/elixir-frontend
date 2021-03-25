import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import ProductCard from '../../../components/cards/ProductCard'
import SideNav from '../../../components/nav/SellerSideNav'
import { deleteProduct, getSellerProducts } from '../../../functions/product'
import { Col, Row } from 'react-bootstrap'

const Products = () => {

    const dispatch = useDispatch()

    const seller = useSelector(state => state.seller)

    const [products, setProducts] = useState()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProducts()
    }, [])


    const getProducts = () => {
        setLoading(true)
        getSellerProducts(seller._id, seller.token).then(res => {
            dispatch({
                type: 'SET_SELLER_PRODUCTS',
                payload: res.data
            })
            setLoading(false)
            setProducts(res.data)
        })
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

            //deleting product images
            if (res) {
                deleteImage(deleteProducts.images)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <SideNav />
            <div className="page-content">

                <h3>Product</h3>
                <Row>
                    {loading ? <p className="m-3">Loading...</p> : seller && products && products.length > 0 ? products.map(p => (
                        <Col key={p._id}>
                            <ProductCard p={p} removeProduct={() => removeProduct(p._id)} />
                        </Col>
                    )) : <p className="m-3">Zero Products To Sell</p>}
                </Row>
            </div>
        </div>
    )
}

export default Products

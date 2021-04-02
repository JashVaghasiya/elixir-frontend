import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UserProductCard from '../../../components/cards/UserProductCard'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getProducts } from '../../../functions/product'

const Products = ({ history }) => {

    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProduct()
    }, [user])

    const getProduct = async () => {
        setLoading(true)
        await getProducts().then(res => {
            console.log(res);
            setProducts(res.data)
            setLoading(false)
        }).catch(err => {
            console.log("Error in Getting Products", err)
        })
    }
    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="product" />
                <main>
                    <div className="main__container">
                        <h3 className="mb-3">Products</h3>
                        <div className="container-fluid">
                            <Row>

                                {
                                    loading ? "Loading..." :
                                        user && products.length > 0 ? products.map(p => (
                                            <div className="m-1">
                                                <UserProductCard product={p} />
                                            </div>
                                        )) : ''
                                }

                            </Row>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Products

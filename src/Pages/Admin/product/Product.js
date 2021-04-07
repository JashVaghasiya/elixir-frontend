import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
                        <div className="header__link__container">
                            <div id="all" className="header__link header__active__link"><Link to="/admin/product/1"><p>All Products</p></Link></div>
                            <div id="unapproved" className="header__link "><Link to="/admin/product/unapproved"><p>Unapproved Products</p></Link></div>
                        </div>
                        <h3>Products</h3>
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
                </main>
            </div>
        </div>
    )
}

export default Products

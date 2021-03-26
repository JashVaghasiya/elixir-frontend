import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import { getProducts } from '../../functions/product'
import UserProductCard from '../../components/cards/UserProductCard'

const Home = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProduct()
    }, [])

    const loadAllProduct = () => {
        getProducts().then(res => {
            setProducts(res.data)
        })
    }

    return (
        <div className="container-fluid">
            <Row>
                {products ? products.map(product => (
                    <UserProductCard key={product._id} product={product} />
                )) : <p className="m-5">No products To show</p>}
            </Row>
        </div>
    )
}

export default Home

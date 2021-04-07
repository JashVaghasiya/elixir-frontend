import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
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
                    <div class="card" style={{ width: "18rem", height: "22rem" }}>
                        <img class="card-img-top" style={{ height: "10rem" }} src={product.images[0].url} alt={product.images[0].name} />
                        <div class="card-body">
                            <h5 class="card-title black">{product.name.length > 20 ? product.name.substring(0, 20).concat("...") : product.name}</h5>
                            <p class="card-text black">{product.description.substring(0, 65).concat("...")}</p>
                            <Link to={`/product/${product._id}`}>View Product</Link>
                        </div>
                    </div>
                )) : <p className="m-5">No products To show</p>}
            </Row>
        </div>
    )
}

export default Home

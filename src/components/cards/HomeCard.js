import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/ProductCard.css'

const HomeProductCard = ({ product }) => {
    return (
        <div className="product">
            <Link to={`/product/${product._id}`}>
                <div className="product-img">
                    <img src={product.images[0].url} alt={product.images[0].name} style={{ height: "250px", padding: "10px" }} />
                </div>
                <h6 className="product-heading">{product.name.length > 50 ? product.name.substring(0, 50).concat("...") : product.name}</h6>
                <div className="rating-review">
                    <div className="rating px-2">
                        <span><i className="fas fa-star"></i> </span>
                        <p className="float-right pl-1">{product.rating}</p>
                    </div>
                    <div>
                        <p className="text-dark">{product.numReviews} reviews</p>
                    </div>
                </div>
                <div className="price-qty">
                    <div className="price">
                        <h4>₹{product.price}</h4>
                    </div>
                    <div className="qty">
                        {product.form === "syrup" || product.form === "drops" ? <p className="qty">{product.qtyPerPack}ml per bottle</p> : <p className="qty">{product.qtyPerPack} per pack</p>}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HomeProductCard

import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/ProductCard.css'

const WishlistCard = ({ product, remove }) => {
    return (
        <div className="wishlist-product">
            <Link to={`/product/${product._id}`}>
                <div className="product-img">
                    <img src={product.images[0].url} alt={product.images[0].name} />
                </div>
                <h6 className="product-heading">{product.name.length > 40 ? product.name.substring(0, 40).concat("...") : product.name}</h6>
            </Link>
            <div className="rating-review">
                <div className="rating">
                    <span><i className="fas fa-star"></i></span>
                    <p className="float-right">{product.rating}</p>
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
            <button className="btn btn-block btn-dark" onClick={() => remove(product._id)}>Remove</button>
        </div>
    )
}

export default WishlistCard

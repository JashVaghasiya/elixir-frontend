import React from 'react'

import { Link } from 'react-router-dom';


const UserProductCard = ({ product, removeProduct }) => {
    return (
        <>
            <Link to={`/product/${product._id}`}>

                <div class="card" style={{ width: "19rem", margin: "10px", background: "#fff" }}>
                    <img class="card-img-top" style={{ height: "16rem", padding: "10px" }} src={product.images[0].url} alt={product.images[0].name} />
                    <div class="card-body">
                        <h5 class="card-title" style={{ fontWeight: 400, height: "50px" }}>{product.name.length > 40 ? product.name.substring(0, 40).concat("...") : product.name}</h5>
                        <p class="card-text" style={{ fontWeight: 200, height: "80px" }}>{product.description.length > 90 ? product.description.substring(0, 90).concat("...") : product.description}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default UserProductCard
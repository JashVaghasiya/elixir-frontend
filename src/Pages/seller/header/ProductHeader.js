import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../Admin/dashboard/css/styles.css'

const SellerHeader = ({ activated }) => {

    const seller = useSelector(state => state.user)

    useEffect(() => {
        let link = document.getElementById(activated)
        link.classList.add("header__active__link")
    }, [activated])

    return (
        <div className="header__link__container">
            <div id="createProduct" className="header__link">{seller && seller.remainingDays > 0 ? <Link to="/seller/product"><p>Create</p></Link> : <Link to="/seller/product">Out Of Limit</Link>}</div>
            <div id="products" className="header__link"><Link to="/seller/products"><p>Products</p></Link></div>
            <div id="activate" className="header__link"><Link to="/seller/products/activate"><p>Activate</p></Link></div>
            {seller && seller.remainingDays > 0 && <div id="deactivate" className="header__link"><Link to="/seller/products/deactivate"><p>Deactivate</p></Link></div>}
            <div id="rejected" className="header__link"><Link to="/seller/products/rejected"><p>Rejected</p></Link></div>
        </div>
    )
}

export default SellerHeader

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../dashboard/css/styles.css'

const SellerHeader = ({ activated }) => {

    useEffect(() => {
        let link = document.getElementById(activated)
        link.classList.add("header__active__link")
    }, [activated])

    return (
        <div className="header__link__container">
            <div id="all" className="header__link"><Link to="/admin/sellers/1"><p>All Sellers</p></Link></div>
            <div id="activated" className="header__link"><Link to="/admin/seller/activated"><p>Activated</p></Link></div>
            <div id="deactivate" className="header__link"><Link to="/admin/seller/deactivated"><p>Deactivated</p></Link></div>
        </div>
    )
}

export default SellerHeader

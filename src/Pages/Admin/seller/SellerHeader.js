import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../dashboard/css/styles.css'

const SellerHeader = ({ active }) => {

    useEffect(() => {
        let link = document.getElementById(active)
        link.classList.add("header__active__link")
    }, [active])

    return (
        <div className="header__link__container">
            <div id="all" className="header__link"><Link to="/admin/sellers"><p>All Sellers</p></Link></div>
            <div id="activated" className="header__link"><Link to="/admin/seller/activated"><p>Activated</p></Link></div>
            <div id="deactivated" className="header__link"><Link to="/admin/seller/deactivated"><p>Deactivated</p></Link></div>
        </div>
    )
}

export default SellerHeader

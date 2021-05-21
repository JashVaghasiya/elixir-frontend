import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../Admin/dashboard/css/styles.css'

const SellerHeader = ({ activated }) => {

    useEffect(() => {
        let link = document.getElementById(activated)
        link.classList.add("header__active__link")
    }, [activated])

    return (
        <div className="header__link__container">
            <div id="order" className="header__link"><Link to="/seller/orders/1"><p>Orders</p></Link></div>
            <div id="unschedule" className="header__link"><Link to="/seller/orders/pickup/1"><p>UnSchedule</p></Link></div>
        </div>
    )
}

export default SellerHeader

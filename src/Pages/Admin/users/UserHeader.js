import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserHeader = ({ activated }) => {
    useEffect(() => {
        let link = document.getElementById(activated)
        link.classList.add("header__active__link")
    }, [activated])

    return (
        <div className="header__link__container">
            <div id="all" className="header__link"><Link to="/admin/users/1"><p>All Users</p></Link></div>
            <div id="activated" className="header__link"><Link to="/admin/user/activated"><p>Activated</p></Link></div>
            <div id="deactivate" className="header__link"><Link to="/admin/user/deactivated"><p>Deactivated</p></Link></div>
        </div>
    )
}

export default UserHeader

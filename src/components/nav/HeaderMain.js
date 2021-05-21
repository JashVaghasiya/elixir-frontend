import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../../Pages/Admin/dashboard/css/styles.css"

const HeaderMain = () => {

    const [sidebar, setSidebar] = useState()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [seller, setSeller] = useState({})
    const [user, setUser] = useState({})
    const users = useSelector(state => state.user)
    const sellers = useSelector(state => state.seller)

    useEffect(() => {
        setSeller(sellers)
        setUser(users)
        setSidebarOpen(false)
        setSidebar(document.getElementById("sidebar"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebar, sidebarOpen, user, seller])

    const toggleSidebar = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true)
            sidebar.classList.add("sidebar_responsive");

        }
    }

    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => toggleSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="navbar__left">
                {/* <a href="#">Subscribers</a>
                <a href="#">Video Management</a>
                <a className="active_link" href="#">Admin</a> */}
            </div>
            <div className="navbar__right">
                {user ?

                    <>
                        <div className="admin-profile">
                            <i className="fa fa-user fa-2x" style={{ color: "white" }} aria-hidden="true"></i>
                        </div>
                        {user && user.role === "user" ?
                            <Link to="/profile" class="white1">
                                {user && user.name}
                            </Link>
                            : ''}
                        {user && user.role === "admin" ?
                            <Link to="/admin/dashboard" class="white1">
                                <ui>
                                    <li>
                                        Hello,
                                    </li>
                                    <li>
                                        {user && user.name}
                                    </li>
                                </ui>
                            </Link>
                            : ''}
                        {user && user.role === "agency" ?
                            <Link to="/agency/1" class="white1">
                                <ui>
                                    <li>
                                        Hello,
                                    </li>
                                    <li>
                                        {user && user.name}
                                    </li>
                                </ui>
                            </Link>
                            : ''}
                        {user && user.role === "seller" ?
                            <Link to={`/seller/profile`} class="white1">
                                <ui>
                                    <li>
                                        Hello,
                                    </li>
                                    <li>
                                        {user && user.name}
                                    </li>
                                </ui>
                            </Link>
                            : ''}



                    </>
                    :
                    <>
                        <i className="fa fa-user-plus"><Link to="/login">Login</Link></i>
                        <i className="fa fa-sing-in-alt"><Link to="/register">Register</Link></i>
                    </>

                }

            </div>
        </nav>
    )
}

export default HeaderMain

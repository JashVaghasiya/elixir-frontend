import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import "../../Pages/Admin/dashboard/css/styles.css"
import Logo from '../../images/elixirLogo.png'
import { auth } from '../../firebase/firebase'


const Admin = ({ active }) => {


    const [sidebar, setSidebar] = useState()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [link, setLink] = useState()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setSidebarOpen(true)
        setSidebar(document.getElementById("sidebar"))
        setLink(document.getElementById(active && active))
    }, [sidebar, sidebarOpen, link, active])

    const closeSidebar = () => {
        if (sidebarOpen) {
            setSidebarOpen(false)
            sidebar.classList.remove("sidebar_responsive");
        }
    }

    if (active && link) {
        link.classList.add("active_menu_link")
        setLink(null)
    }

    const logout = () => {
        auth.signOut()
        dispatch({
            type: 'LOGOUT_USER',
            payload: null
        })
        dispatch({
            type: 'UNSET_SELLER',
            payload: null
        })
        history.push('/login')
    }

    return (
        <div id="sidebar" onClick={() => closeSidebar()}>

            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={Logo} alt="logo" />
                    <h1 className="sidebar__title">elixir</h1>
                </div>
            </div>
            <div className="grey"></div>
            <div className="sidebar__menu mt-3">
                <div id="dashboard" className="sidebar__link">
                    <i class="fas fa-home"></i>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </div>

                <div id="seller" className="sidebar__link">
                    <i class="fas fa-user-tag"></i>
                    <Link to="/admin/sellers/1" className="has-arrow waves-effect">Sellers</Link>
                </div>
                <div id="user" className="sidebar__link">
                    <i class="fas fa-user"></i>
                    <Link to="/admin/users/1">Users</Link>
                </div>
                <div id="doctor" className="sidebar__link">
                    <i class="fas fa-briefcase-medical"></i>
                    <Link to="/admin/doctor/1">Doctor</Link>
                </div>
                <div id="product" className="sidebar__link">
                    <i class="fas fa-pills"></i>
                    <Link to="/admin/product/1">Products</Link>
                </div>
                <div id="category" className="sidebar__link">
                    <i className="fa fa-list"></i>
                    <Link to="/admin/category">Category</Link>
                </div>
                <div id="sub" className="sidebar__link">
                    <i className="fa fa-code-branch"></i>
                    <Link to="/admin/sub">SubCategory</Link>
                </div>
                <div id="order" className="sidebar__link">
                    <i className="fas fa-box-open"></i>
                    <Link to="/admin/orders/1">Orders</Link>
                </div>
                <div id="ads" className="sidebar__link">
                    <i class="fas fa-ad"></i>
                    <Link to="/admin/ads/1">Ads</Link>
                </div>
                <div id="complain" className="sidebar__link">
                    <i class="fas fa-exclamation-circle"></i>
                    <Link to="/admin/complain">Complain</Link>
                </div>
                <div id="agency" className="sidebar__link">
                    <i className="fas fa-shipping-fast"></i>
                    <Link to="/admin/shipping/agency">Shipping Agency</Link>
                </div>
                <div id="package" className="sidebar__link">
                    <i className="fas fa-ticket-alt"></i>
                    <Link to="/admin/package">Package</Link>
                </div>
                <div id="coupon" className="sidebar__link">
                    <i className="fa fa-tag"></i>
                    <Link to="/admin/coupon">Coupon</Link>
                </div>
                <div id="poster" className="sidebar__link">
                    <i class="far fa-caret-square-right"></i>
                    <Link to="/admin/poster">Poster</Link>
                </div>

                <div id="state" className="sidebar__link">
                    <i className="fa fa-chart-area"></i>
                    <Link to="/admin/states">States</Link>
                </div>
                <div id="city" className="sidebar__link">
                    <i className="fa fa-building"></i>
                    <Link to="/admin/cities">Cities</Link>
                </div>
                <div id="password" className="sidebar__link">
                    <i className="fa fa-key"></i>
                    <Link to="/admin/change/password">Change Password</Link>
                </div>
                <div className="sidebar__logout" style={{ "text-align": "center", "cursor": "pointer" }} onClick={() => logout()}>
                    <i className="fa fa-power-off"></i>
                    Log out
                </div>
            </div>
        </div>
    )
}

export default Admin

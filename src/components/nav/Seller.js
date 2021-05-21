import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    const seller = useSelector(state => state.user)

    useEffect(() => {
        setSidebarOpen(true)
        setSidebar(document.getElementById("sidebar"))
        setLink(document.getElementById(active && active))
    }, [sidebar, sidebarOpen, link, active, seller])

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
            <li className="grey"></li>
            <div className="sidebar__menu">
                <div id="dashboard" className="sidebar__link">
                    <i class="fas fa-home"></i>
                    <Link to="/seller/dashboard">Dashboard</Link>
                </div>

                <div id="product" className="sidebar__link">
                    {seller && seller.remainingDays > 0 ?
                        <>
                            <i class="fas fa-pills"></i>
                            <Link to="/seller/product">Product</Link>
                        </>
                        :
                        <>
                            <i class="fas fa-ticket-alt"></i>
                            <Link to="/package">Renew</Link>
                        </>
                    }
                </div>
                <div id="orders" className="sidebar__link">
                    <i className="fas fa-box-open"></i>
                    <Link to="/seller/orders/1">Orders</Link>
                </div>
                <div id="ads" className="sidebar__link">
                    <i class="fas fa-ad"></i>
                    <Link to="/seller/ads/1">Ads</Link>
                </div>
                <div id="changePassword" className="sidebar__link">
                    <i className="fa fa-key"></i>
                    <Link to="/seller/change/password">Change Password</Link>
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

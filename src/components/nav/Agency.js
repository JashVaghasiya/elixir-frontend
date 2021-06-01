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
            <li className="grey"></li>
            <div className="sidebar__menu">
                <div id="orders" className="sidebar__link">
                    <i className="fas fa-box-open"></i>
                    <Link to="/agency/1">Orders</Link>
                </div>
                <div id="pickUps" className="sidebar__link">
                    <i class="fas fa-ad"></i>
                    <Link to="/agency/pickup/1">Pick-Ups</Link>
                </div>
                <div id="manageOrders" className="sidebar__link">
                    <i class="fas fa-ad"></i>
                    <Link to="/agency/manage/1">Manage Orders</Link>
                </div>
                <div id="changePassword" className="sidebar__link">
                    <i className="fa fa-key"></i>
                    <Link to="/agency/change/password">Change Password</Link>
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

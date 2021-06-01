import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import '../../css/Header.css'
import Logo from '../../images/elixirLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase/firebase'
import MenuNavbar from './MenuNavbar'

const Header = () => {


    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const [search, setSearch] = useState(null)

    useEffect(() => {

    }, [user])

    const logout = async () => {
        await auth.signOut()
        dispatch({
            type: 'LOGOUT_USER',
            payload: null
        })
        history.push('/login')
        window.location.reload()

    }

    const getSearchedProducts = () => {
        if (search !== null) {
            history.push('/product/find?search=' + search)
        }
    }

    return (
        <div className="header-wrapper">
            <div className="nav-wrapper">
                <nav id="navbar">
                    {((user && user.role === "admin") || (user && user.role === "seller") || (user && user.role === "agency"))
                        ?
                        <div className="logo"><img src={Logo} alt="logo" />
                            <h1>elixir</h1>
                        </div>
                        :

                        <Link to="/">
                            <div className="logo"><img src={Logo} alt="logo" />
                                <h1>elixir</h1>
                            </div>
                        </Link>
                    }

                    <ul>
                        <div className="search-btn-group">
                            <button type="button" style={{ width: 50 }} className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search" style={{ color: "white" }}></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="search-item">
                                    <input name="txtsearch" type="text" placeholder="Search..." style={{ border: "none", background: "#333", padding: 5, outline: "none", width: 237, color: "white" }} value={search} onChange={e => setSearch(e.target.value)} />
                                    <button name="btnsearch" style={{
                                        background: "#acacac",
                                        width: 40,
                                        height: 35,
                                        fontSize: 13,
                                        letterSpacing: 1,
                                        color: "#ffffff",
                                        borderRadius: 3,
                                        textAlign: "center",
                                        border: "2px solid #acacac",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }} onClick={() => getSearchedProducts()}>
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {user !== null ? <>
                            {user && user.role === "user" ?
                                <>
                                    <li className="float-left"><Tooltip title="Cart" color="black"><Link to="/user/cart"><i className="fas fa-shopping-cart"></i></Link></Tooltip></li>
                                    <li className="float-left"><Tooltip title="Wishlist" color="black"><Link to="/user/wishlist"><i className="fas fa-heart"></i></Link></Tooltip></li>
                                </>
                                : ''}
                            <li className="float-left"><Tooltip title="Chat" color="black"><Link to="/chat"><i className="fas fa-comment-medical"></i></Link></Tooltip></li>
                            <div className="btn-group">
                                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user && user.name.length > 5 ? user.name.substr(0, 5).concat('...') : user.name}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {user && user.role === "user" ? <Link to="/user/profile" className="dropdown-item"><i class="far fa-user-circle mr-1"></i> Profile</Link> : ''}
                                    <Link onClick={() => logout()} className="dropdown-item"><i class="fas fa-power-off mr-1 text-red"></i> Logout</Link>
                                </div>
                            </div>
                        </> :
                            <>
                                <li className="float-left"><Link to='/login'><i className="fas fa-user mr-1"></i> Login</Link></li>
                                <li className="float-left"><Link to='/register'><i className="fas fa-user-plus mr-1"></i> Register</Link></li>
                            </>}
                    </ul>
                </nav>
                <MenuNavbar />
            </div>

        </div>
    )
}

export default Header

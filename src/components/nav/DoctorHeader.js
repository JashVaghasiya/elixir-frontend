import React, { useEffect } from 'react'
import { Tooltip } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import '../../css/Header.css'
import Logo from '../../images/elixirLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase/firebase'

const Header = () => {


    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)


    useEffect(() => {

    }, [user])

    const logout = async () => {
        await auth.signOut()
        dispatch({
            type: 'LOGOUT_USER',
            payload: null
        })
        history.push('/login')
    }

    return (

        <nav id="navbar">

            <div className="doctor-header"><img src={Logo} alt="logo" />
                <h1>elixir</h1>
            </div>

            <ul>
                {user !== null ? <>
                    <li><Tooltip title="Chat" color="black"><Link to="/chat"><i className="fas fa-comment-medical"></i></Link></Tooltip></li>
                    <div className="btn-group">
                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user && user.name}
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            {user ? <Link to="/doctor/profile" className="dropdown-item"><i class="far fa-user-circle mr-1"></i> Profile</Link> : ''}
                            {/* {user && user.role === "seller" ? <Link to="/seller/profile" className="dropdown-item"><i class="far fa-user-circle mr-1"></i> Profile</Link> : ''} */}
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

    )
}

export default Header

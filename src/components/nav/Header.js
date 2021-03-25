import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { AreaChartOutlined, HeartOutlined, HomeOutlined, PoweroffOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'

import '../../App.css'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from 'antd/lib/avatar/avatar'
import { auth } from '../../firebase/firebase'
import avatar from '../../images/avatar.png'

const { Item, SubMenu } = Menu

const Header = () => {

    const [current, setCurrent] = useState('')
    const [user, setUser] = useState({})
    const [seller, setSeller] = useState({})

    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(state => state.user)
    const sellers = useSelector(state => state.seller)


    useEffect(() => {
        setSeller(sellers)
        setUser(users)
    }, [users, sellers, user, seller])

    const handleClick = e => {
        setCurrent(e.key)
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

        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" >
            <Item key="home" icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
            </Item>

            {user || seller ?
                <>
                    <Item key="cart" icon={<ShoppingCartOutlined />}>
                        <Link to='/user/cart'>Cart</Link>
                    </Item>
                    <SubMenu className='float-right' key='sub-menu-key' icon={<Avatar size={35} gap={50} src={avatar} />} title={" ".concat((seller && seller.name) || (user && user.name))}>
                        {user && user.role === 'user' ? <Item icon={<UserOutlined />}><Link to='/profile'></Link> Profile</Item> : ''}
                        {user && user.role === 'admin' ? <Item icon={<AreaChartOutlined />} ><Link to='/admin/dashboard'>Dashboard</Link></Item> : ''}
                        {seller && seller.role === 'seller' ? <Item icon={<AreaChartOutlined />}><Link to='/seller/dashboard'>Dashboard</Link></Item> : ''}
                        <Item key="logout" icon={<PoweroffOutlined />} onClick={logout}>LogOut</Item>
                    </SubMenu>
                    <Item className='float-right' key="wishlist" icon={<HeartOutlined />}>
                        <Link to='/user/wishlist'>Wishlist</Link>
                    </Item>
                </>
                :
                <>
                    <Item key="signUp" icon={<UserAddOutlined />} className='float-right'>
                        <Link to='/register'>SignUp</Link>
                    </Item>
                    <Item key="login" icon={<UserOutlined />} className='float-right'>
                        <Link to='/login'>Login</Link>
                    </Item>
                </>
            }

        </Menu>
    )
}

export default Header

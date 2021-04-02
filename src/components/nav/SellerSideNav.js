import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu
const { Sider } = Layout;

const SideNav = () => {

    const seller = useSelector(state => state.seller)

    return (
        <Sider className="side-nav" >
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                style={{ height: '100%', border: 0 }}
            >
                <Menu.Item key="dashboard">
                    <Link to="/seller/dashboard">Dashboard</Link>
                </Menu.Item>
                <SubMenu title="Product">
                    <Menu.Item key="cerateProduct">
                        {seller && seller.remainingProducts > 0 ? <Link to="/seller/product">Create Product</Link> : 'Out of Limit'}
                    </Menu.Item>
                    <Menu.Item key="products">
                        <Link to="/seller/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="activate">
                        <Link to="/seller/products/activate">Activate</Link>
                    </Menu.Item>
                    <Menu.Item key="deactivate">
                        <Link to="/seller/products/deactivate">Deactivate</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="orders">
                    <Link to="/seller/orders">Orders</Link>
                </Menu.Item>
                <Menu.Item key="ads">
                    <Link to="/seller/ads">Ads</Link>
                </Menu.Item>
                <Menu.Item key="password">
                    <Link to="/change/password">Change Password</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideNav

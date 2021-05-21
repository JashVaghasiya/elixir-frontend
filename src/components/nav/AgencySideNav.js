import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom';

const { Sider } = Layout

const AgencySideNav = () => {
    return (
        <Sider className="side-nav" >
            <Menu mode="inline" style={{ height: '100%', border: 1 }}>
                <Menu.Item key="agency" >
                    <Link to="/agency/1">Orders</Link>
                </Menu.Item>
                <Menu.Item key="pickup" >
                    <Link to="/agency/pickup/1">PickUps</Link>
                </Menu.Item>
                <Menu.Item key="manage" >
                    <Link to="/agency/manage/1">Manage Orders</Link>
                </Menu.Item>
                <Menu.Item key="change-password" >
                    <Link to="/agency/change/password">Change Password</Link>
                </Menu.Item>
            </Menu>
        </Sider>




    )
}

export default AgencySideNav
import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const { SubMenu } = Menu
const { Sider } = Layout;

const AdminSideNav = () => {


    return (
        <Sider className="side-nav" >
            <Menu
                mode="inline"
                defaultSelectedKeys={[]}
                style={{ height: '100%', border: 1 }}
            >
                <Menu.Item key="dashboard" >
                    <Link to="/admin/dashboard">Dashboard</Link>
                </Menu.Item>
                <SubMenu key="product" title="Products" >
                    <Menu.Item key="product">
                        <Link to="/admin/product">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="product-unapproved">
                        <Link to="/admin/product/unapproved">Unapproved Product</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="category" >
                    <Link to="/admin/category">Category</Link>
                </Menu.Item>

                <Menu.Item key="subs" >
                    <Link to="/admin/sub">SubCategory</Link>
                </Menu.Item>

                <SubMenu key="user" title="User" >
                    <Menu.Item key="users">
                        <Link to="/admin/users">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="active-Users">
                        <Link to="/admin/user/activated">Activated User</Link>
                    </Menu.Item>
                    <Menu.Item key="deactivate-Users">
                        <Link to="/admin/user/deactivated">Deactivated User</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu title="Seller" key="seller" >
                    <Menu.Item key="sellers">
                        <Link to="/admin/sellers">Sellers</Link>
                    </Menu.Item>
                    <Menu.Item key="active-sellers">
                        <Link to="/admin/seller/activated">Activated Seller</Link>
                    </Menu.Item>
                    <Menu.Item key="deactivate-sellers">
                        <Link to="/admin/seller/deactivated">Deactivated Seller</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="order" >
                    <Link to="/admin/orders">Orders</Link>
                </Menu.Item>
                <Menu.Item key="coupon" >
                    <Link to="/admin/coupon">Coupon</Link>
                </Menu.Item>
                <Menu.Item key="agency" >
                    <Link to="/admin/agency">Shipping Agency</Link>
                </Menu.Item>
                <Menu.Item key="package" >
                    <Link to="/admin/package">Package</Link>
                </Menu.Item>
                <Menu.Item key="states" >
                    <Link to="/admin/states">States</Link>
                </Menu.Item>
                <Menu.Item key="cities" >
                    <Link to="/admin/cities">Cities</Link>
                </Menu.Item>
                <Menu.Item key="password" >
                    <Link to="/change/password">Change Password</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default AdminSideNav

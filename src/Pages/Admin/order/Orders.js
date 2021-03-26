import React from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const Orders = () => {

    const [orders, setOrders] = useState([])

    return (
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3>Orders</h3>
                <hr />
                <Table striped bordered hover size="xm">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Total Items</th>
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Paid At</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 && orders.map(u => (
                            <tr key={u._id}>
                                <td>{u._id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.package}</td>
                                <td>{u.remainingDays}</td>
                                <td>{u.remainingProducts}</td>
                                <td>{u.activated ? "Active" : "Deactivated"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Orders

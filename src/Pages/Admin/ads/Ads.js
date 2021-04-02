import React from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'

const Ads = () => {

    const [ads, setAds] = useState([])

    return (
        <div id="body" >
            <div className="container-main">
                <Header />
                <AdminSideNav active="ads" />
                <main>
                    <div className="container-fluid">
                        <h3>Ads</h3>
                        <hr />
                        <Table striped bordered hover variant="dark" size="xm">
                            <thead>
                                <tr>
                                    <th>Ad Id</th>
                                    <th>Seller Id</th>
                                    <th>Seller Name</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Days Remaining</th>
                                    <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads.length > 0 && ads.map(u => (
                                    <tr key={u._id}>
                                        <td>{u._id}</td>
                                        <td>{u.sellerId}</td>
                                        <td>{u.sellerName}</td>
                                        <td>{u.productId}</td>
                                        <td>{u.productName}</td>
                                        <td>{u.remainingDays}</td>
                                        <td>{u.paidAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Ads

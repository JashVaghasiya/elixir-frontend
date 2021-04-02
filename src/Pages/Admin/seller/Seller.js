import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSeller } from '../../../functions/seller'
import { Table } from 'react-bootstrap';
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { Link } from 'react-router-dom';
import '../dashboard/css/styles.css'
import SellerHeader from './SellerHeader';


const Seller = () => {

    const [sellers, setSellers] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadSeller()
    }, [user])

    const loadSeller = async () => {
        setLoading(true)
        await getSeller(user && user.token).then(res => {
            setSellers(res.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="seller" />
                <main>
                    <div className="main__container">
                        <h3>Sellers</h3>
                        <div className="white2"></div>
                        <SellerHeader active="all" />

                        <Table striped bordered hover variant="dark" size="xm">
                            <thead>
                                <tr>
                                    <th>Seller Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Package Name</th>
                                    <th>Remaining Days</th>
                                    <th>Remaining Products</th>
                                    <th>Active or Deactivated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? "Loading..." : sellers.length > 0 && sellers.map(u => (
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
                </main>
            </div>
        </div>
    )
}

export default Seller



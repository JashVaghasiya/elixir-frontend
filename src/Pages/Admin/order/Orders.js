import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Paginator from '../../../components/Paginator'
import { getOrders } from '../../../functions/order'
import '../../../main.css'
const Orders = ({ match }) => {

    const [orders, setOrders] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [sortName, setSortName] = useState("_id")
    const [manner, setManner] = useState(1)

    const pageNumber = match.params.pageNumber || 0

    useEffect(() => {
        loadSeller()
    }, [pageNumber, manner, sortName])

    const loadSeller = async () => {
        setLoading(true)
        await getOrders(3, pageNumber, sortName, manner, user && user.token).then(res => {
            setOrders(res.data.orders)
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const setSort = (name) => {
        console.log("In")
        setSortName(name)
        if (manner === 1) {
            setManner(-1)
        } else {
            setManner(1)
        }
    }


    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="order" />
                <main>
                    <div className="main__container">
                        <h3>Orders</h3>
                        <div className="white2"></div>
                        <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                            <thead>
                                <tr>
                                    <th>Order Id <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                    <th>Customer <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                    <th>Total Items <i className="fas fa-sort" onClick={() => setSort("totalItems")}></i></th>
                                    <th>Amount <i className="fas fa-sort" onClick={() => setSort("amount")}></i></th>
                                    <th>Paid <i className="fas fa-sort" onClick={() => setSort("paid")}></i></th>
                                    <th>Paid At <i className="fas fa-sort" onClick={() => setSort("paidAt")}></i></th>
                                    <th>Status <i className="fas fa-sort" onClick={() => setSort("status")}></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.length > 0 && orders.map(u => (
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
                        <Paginator role="order" pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Orders

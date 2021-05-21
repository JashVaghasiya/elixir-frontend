import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AgencySideNav from '../../components/nav/Agency'
import AgencyHeader from '../../components/nav/HeaderMain'
import AgencyPaginator from '../../components/paginator/AgencyPaginator'
import { getAgencyOrders } from '../../functions/order'
import Loader from '../../components/Loader'

const Orders = ({ match }) => {

    const agency = useSelector(state => state.user)
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [limit, setLimit] = useState(10)
    const [sortName, setSortName] = useState("_id")
    const [manner, setManner] = useState(1)
    const pageNumber = match.params.pageNumber || 1
    useEffect(() => {
        loadOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agency, limit, pageNumber, manner, sortName])

    const loadOrders = async () => {
        setLoading(true)
        await getAgencyOrders("all", limit, pageNumber, sortName, manner, agency && agency.token).then(res => {
            setOrders(res.data.orders)
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const setSort = (name) => {
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
                <AgencyHeader />
                <AgencySideNav active="orders" />
                <main>
                    <div className="main__container">
                        <h3 className="mb-3">Orders</h3>
                        {loading ? <Loader color="white" /> :
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th>Order Id <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                        <th>Customer Name</th>
                                        <th>Total Items <i className="fas fa-sort" onClick={() => setSort("qty")}></i></th>
                                        <th>Amount <i className="fas fa-sort" onClick={() => setSort("grandTotal")}></i></th>
                                        <th>Ordered At <i className="fas fa-sort" onClick={() => setSort("createdAt")}></i></th>
                                        <th>Status <i className="fas fa-sort" onClick={() => setSort("status")}></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(u => (
                                        <tr key={u._id}>
                                            <td><Link to={`/agency/order/detail/${u._id}`}><p>{u._id}</p></Link></td>
                                            <td>{u.userId.name}</td>
                                            <td>{u.totalQty}</td>
                                            <td>{u.grandTotal}</td>
                                            <td>{u.createdAt.substr(0, 10)}</td>
                                            <td>{u.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                        <AgencyPaginator role="order" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Orders

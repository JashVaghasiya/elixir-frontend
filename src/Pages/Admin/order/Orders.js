import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import Paginator from '../../../components/paginator/AdminPaginator'
import { getOrders } from '../../../functions/order'
import '../../../main.css'
const Orders = ({ match, history }) => {

    const [orders, setOrders] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [sortName, setSortName] = useState("createdAt")
    const [manner, setManner] = useState(1)
    const [limit, setLimit] = useState(10)

    const pageNumber = match.params.pageNumber || 0

    useEffect(() => {
        if (user && user._id) {

            loadOrders()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, pageNumber, manner, sortName, user])

    const loadOrders = async () => {
        setLoading(true)
        await getOrders(limit, pageNumber, sortName, manner, user && user.token).then(res => {
            setOrders(res.data.orders)
            console.log(res.data.orders)
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            setLoading(false)
        }).catch(error => {
            console.log(error)
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


    const goToDetail = (id) => {
        history.push(`/admin/${id}/detail`)
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
                                        <th>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(o => (
                                        <tr key={o._id} onClick={() => goToDetail(o._id)}>
                                            {/* <td onClick={() => goToDetail(o._id)}>{o._id}</td>
                                            <td onClick={() => goToDetail(o._id)}>{o.userId.name}</td> */}
                                            <td onClick={() => goToDetail(o._id)}>{o.totalQty}</td>
                                            <td onClick={() => goToDetail(o._id)}>{o.grandTotal}</td>
                                            <td onClick={() => goToDetail(o._id)}>{o.createdAt.substr(0, 10)}</td>
                                            <td>{o.status}</td>
                                            <td className="btn-block form-button text-center"><a href={o.invoiceURL} alt={o.invoiceURL}>Invoice</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                        <Paginator role="order" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Orders

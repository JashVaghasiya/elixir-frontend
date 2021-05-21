import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AgencySideNav from '../../components/nav/Agency'
import AgencyHeader from '../../components/nav/HeaderMain'
import Loader from '../../components/Loader'
import AgencyPaginator from '../../components/paginator/AgencyPaginator'
import { manageOrder } from '../../functions/agency'
import { getAgencyOrders } from '../../functions/order'

const MangeOrders = ({ match }) => {

    const agency = useSelector(state => state.user)
    const [orders, setOrders] = useState()
    const [status, setStatus] = useState('Pending')
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [limit, setLimit] = useState(10)
    const [sortName, setSortName] = useState("_id")
    const [manner, setManner] = useState(1)
    const pageNumber = match.params.pageNumber || 1

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true)
            await getAgencyOrders(status, limit, pageNumber, sortName, manner, agency && agency.token).then(res => {
                setOrders(res.data.orders)
                setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
        loadOrders()
    }, [status, limit, pageNumber, manner, sortName, agency])



    const setSort = (name) => {
        setSortName(name)
        if (manner === 1) {
            setManner(-1)
        } else {
            setManner(1)
        }
    }

    const changeStatus = async (e, id) => {
        await manageOrder(id, e.target.value, agency && agency.token).then(res => {
            getAgencyOrders(status, limit, pageNumber, sortName, manner, agency && agency.token).then(res => {
                setOrders(res.data.orders)
                setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            }).catch(err => {
                console.log(err)
            })
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <AgencyHeader />
                <AgencySideNav />
                <main>
                    <div className="main__container">
                        <h3 className="mb-3">Manage Orders</h3>
                        <div className="header__link__container">
                            <select className="p-1 bg-dark text-white" onChange={(e) => setStatus(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Packed">Packed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                        {
                            loading ? <Loader color="white" /> :
                                <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                    <thead>
                                        <tr>
                                            <th>OrderId <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                            <th>Customer Email</th>
                                            <th>Qty <i className="fas fa-sort" onClick={() => setSort("qty")}></i></th>
                                            <th>Amount <i className="fas fa-sort" onClick={() => setSort("grandTotal")}></i></th>
                                            <th>OrderedAt <i className="fas fa-sort" onClick={() => setSort("createdAt")}></i></th>
                                            <th>Set To Picked</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.length > 0 && orders.map(o => (
                                            <tr key={o._id}>
                                                <td>{o._id}</td>
                                                <td>{o.userId.email}</td>
                                                <td>{o.qty}</td>
                                                <td>{o.grandTotal}</td>
                                                <td>{o.createdAt.substr(0, 10)}</td>
                                                <td>
                                                    <select className="p-1 bg-dark text-white" onChange={(e) => changeStatus(e, o._id)}>
                                                        {o.status === 'Pending' && <option selected={o.status === 'Pending'} value="Pending" >Pending</option>}
                                                        {(o.status === 'Pending' || o.status === 'Packed') && <option selected={o.status === 'Packed'} value="Packed">Packed</option>}
                                                        {(o.status === 'Shipped' || o.status === 'Packed') && <option selected={o.status === 'Shipped'} value="Shipped">Shipped</option>}
                                                        {(o.status === 'Shipped' || o.status === 'Delivered') && <option selected={o.status === 'Delivered'} value="Delivered">Delivered</option>}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        }
                        <AgencyPaginator role="manage" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MangeOrders



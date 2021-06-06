import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import SellerSideNav from '../../../components/nav/Seller'
import Paginator from '../../../components/paginator/SellerPaginator'
import { getSellerOrders } from '../../../functions/order'
import OrderHeader from '../header/OrderHeader'
import SellerHeader from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'

const Orders = ({ match }) => {
    const seller = useSelector(state => state.user)
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [limit, setLimit] = useState(10)
    const [sortName, setSortName] = useState("createdAt")
    const [manner, setManner] = useState(-1)
    const pageNumber = match.params.pageNumber || 1
    useEffect(() => {
        loadOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seller, limit, pageNumber, manner, sortName])

    const loadOrders = async () => {

        setLoading(true)
        await getSellerOrders(limit, pageNumber, sortName, manner, seller && seller._id, seller && seller.token).then(res => {
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
                <SellerHeader />
                <SellerSideNav active="orders" />
                <main>
                    <div className="main__container">
                        <OrderHeader activated="order" />
                        {loading ? <Loader color="white" /> :
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th>OrderId <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                        <th>Customer Email</th>
                                        <th>Image</th>
                                        <th>ProductName</th>
                                        <th>Qty <i className="fas fa-sort" onClick={() => setSort("qty")}></i></th>
                                        <th>Amount <i className="fas fa-sort" onClick={() => setSort("totalAmount")}></i></th>
                                        <th>OrderedAt <i className="fas fa-sort" onClick={() => setSort("createdAt")}></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(o => (
                                        <tr key={o._id}>
                                            <td>{o._id}</td>
                                            <td>{o.userId.email}</td>
                                            <td><img style={{ height: "75px", width: "75px" }} src={o.productId.images[0].url} alt={o.productId.images[0].name} /></td>
                                            <td>{o.productId.name}</td>
                                            <td>{o.totalQty}</td>
                                            <td>{o.totalAmount}</td>
                                            <td>{o.createdAt.substr(0, 10)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                        {orders && orders.length > 10 ? <Paginator role="orders" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} /> : ''}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Orders

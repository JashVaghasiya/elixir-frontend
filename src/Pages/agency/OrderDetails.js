import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AgencySideNav from '../../components/nav/AgencySideNav'
import AgencyHeader from '../../components/nav/HeaderMain'
import Loader from '../../components/Loader'
import { getDetailOfOrder } from '../../functions/order'

const OrderDetails = ({ match }) => {
    const agency = useSelector(state => state.user)
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agency])

    const loadOrders = async () => {
        setLoading(true)
        await getDetailOfOrder(match.params.id, agency && agency.token).then(res => {
            setOrders(res.data.orders)
            setLoading(false)
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
                        <h3 className="mb-3">PickUp Orders</h3>
                        {loading ? <Loader color="white" /> :
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th>OrderId</th>
                                        <th>Customer Email</th>
                                        <th>Product Id</th>
                                        <th>Image</th>
                                        <th>ProductName</th>
                                        <th>Qty</th>
                                        <th>OrderedAt</th>
                                        <th>Picked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(o => (
                                        <tr key={o._id}>
                                            <td>{o._id}</td>
                                            <td>{o.userId.email}</td>
                                            <td><Link to={`/product/${o.productId._id}`}><p>{o.productId._id}</p></Link></td>
                                            <td><img src={o.productId.images[0].url} alt={o.productId.images[0].name} height="75" width="75" /></td>
                                            <td>{o.productId.name}</td>
                                            <td>{o.totalQty}</td>
                                            <td>{o.createdAt.substr(0, 10)}</td>
                                            <td>{o.picked ? <i class="far fa-check-circle text-success"></i> : <i class="far fa-times-circle text-danger"></i>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default OrderDetails

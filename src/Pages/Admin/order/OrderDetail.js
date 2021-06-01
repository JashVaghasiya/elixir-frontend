import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import { getDetailOrder } from '../../../functions/order'
import '../../../main.css'
const Orders = ({ match, history }) => {

    const [orders, setOrders] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user && user._id) {
            const loadOrders = async () => {
                setLoading(true)
                await getDetailOrder(match.params.id, user && user.token).then(res => {
                    setOrders(res.data)
                    console.log(res.data)
                    setLoading(false)
                }).catch(error => {
                    console.log(error)
                })
            }
            loadOrders()
        }
    }, [match.params.id, user])



    const goToProduct = (id) => {
        history.push(`/product/${id}`)
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="order" />
                <main>
                    <div className="main__container">
                        <Link className="form-button mb-1" to="/admin/orders/1">Go Back</Link>
                        <h3>Orders</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th>Product Id</th>
                                        <th>Product Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                        <th>Picked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(o => (
                                        o.productId &&
                                        <tr onClick={() => goToProduct(o.productId._id)}>
                                            <td>{o.productId._id}</td>
                                            <td>{o.productId.name}</td>
                                            <td><img src={o.productId.images[0].url} alt={o.productId.images[0].name} style={{ height: "75px", width: "75px" }} /></td>
                                            <td>{o.productId.price}</td>
                                            <td>{o.totalQty}</td>
                                            <td>{o.totalAmount}</td>
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

export default Orders

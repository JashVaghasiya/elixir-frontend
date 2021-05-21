import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AgencySideNav from '../../components/nav/Agency'
import AgencyPaginator from '../../components/paginator/AgencyPaginator'
import { setPicked } from '../../functions/agency'
import AgencyHeader from '../../components/nav/HeaderMain'
import { getAgencyDetailOrders } from '../../functions/order'
import Loader from '../../components/Loader'

const PickUpOrder = ({ match }) => {
    const agency = useSelector(state => state.user)
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [limit, setLimit] = useState(10)
    const [sortName, setSortName] = useState("_id")
    const [manner, setManner] = useState(1)
    const pageNumber = match.params.pageNumber || 1
    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true)
            await getAgencyDetailOrders(limit, pageNumber, sortName, manner, agency && agency.token).then(res => {
                setOrders(res.data.orders)
                setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
        loadOrders()
    }, [agency, limit, pageNumber, manner, sortName])



    const setSort = (name) => {
        setSortName(name)
        if (manner === 1) {
            setManner(-1)
        } else {
            setManner(1)
        }
    }

    const setPickedToTrue = async (id) => {
        await setPicked(id, agency && agency.token).then(res => {
            const filteredOrders = orders.filter(o => o._id !== id)
            setOrders(filteredOrders)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <AgencyHeader />
                <AgencySideNav active="pickUps" />
                <main>
                    <div className="main__container">
                        <h3 className="mb-3">PickUp Orders</h3>
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
                                        <th>Set To Picked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(o => (
                                        <tr key={o._id}>
                                            <td>{o._id}</td>
                                            <td>{o.userId.email}</td>
                                            <td><img src={o.productId.images[0].url} alt={o.productId.images[0].name} height="75" width="75" /></td>
                                            <td>{o.productId.name}</td>
                                            <td>{o.totalQty}</td>
                                            <td>{o.totalAmount}</td>
                                            <td>{o.createdAt.substr(0, 10)}</td>
                                            <td><i onClick={() => setPickedToTrue(o._id)} class="far fa-check-circle text-success"></i></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                        <AgencyPaginator role="pickup" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default PickUpOrder


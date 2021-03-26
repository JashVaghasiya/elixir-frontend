import React from 'react'
import { useEffect } from 'react'
import { getUserCount, getOrderCount, getLocationCount, getProductCount, getOtherCount } from '../../functions/admin'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../components/nav/AdminSideNav'
import CountCard from '../../components/cards/CountCard'
import { useState } from 'react'
import { Row } from 'react-bootstrap'

const AdminDashboard = () => {

    const user = useSelector(state => state.user)
    const [userData, setUserData] = useState([])
    const [locationData, setLocationData] = useState([])
    const [otherData, setOtherData] = useState([])
    const [productData, setProductData] = useState([])
    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            getData()
        }
    }, [])

    const getData = async () => {
        setLoading(true)
        await getUserCount(user && user.token).then(res => {
            setUserData(res.data)
            console.log(res.data)
        })
        await getOrderCount(user && user.token).then(res => {
            setOrderData(res.data)
        })
        await getLocationCount(user && user.token).then(res => {
            setLocationData(res.data);
        })
        await getProductCount(user && user.token).then(res => {
            setProductData(res.data);
        })
        await getOtherCount(user && user.token).then(res => {
            setOtherData(res.data);
        })
        setLoading(false)
    }

    return (
        <div>
            <AdminSideNav />
            <div className="page-content">
                <div className="container-fluid">
                    <h3>Dashboard</h3>
                    <hr />
                    <Row>
                        {loading ? "Loading..." : userData && userData.length > 0 && userData.map(u => (
                            <div className="m-2">
                                <CountCard data={u} />
                            </div>
                        ))}
                    </Row>
                    <hr />
                    <Row>
                        {loading ? "Loading..." : orderData && orderData.length > 0 && orderData.map(u => (
                            <div className="m-2">
                                <CountCard data={u} />
                            </div>
                        ))}
                    </Row>
                    <hr />
                    <Row>
                        {loading ? "Loading..." : productData && productData.length > 0 && productData.map(u => (
                            <div className="m-2">
                                <CountCard data={u} />
                            </div>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

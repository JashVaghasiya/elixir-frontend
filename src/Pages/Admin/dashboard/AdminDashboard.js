import React, { useRef } from 'react'
import { useEffect } from 'react'
import { getUserCount, getOrderCount, getLocationCount, getProductCount, getOtherCount } from '../../../functions/admin'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import CountCard from '../../../components/cards/CountCard'
import { useState } from 'react'
import ApexCharts from 'apexcharts'
import './css/styles.css'
import { count, barChart } from './js/script.js'


const AdminDashboard = () => {

    const user = useSelector(state => state.user)
    const [userData, setUserData] = useState(0)
    const [sellerData, setSellerData] = useState(0)
    const [productData, setProductData] = useState(0)
    // const [locationData, setLocationData] = useState(0)
    const [orderData, setOrderData] = useState(0)
    const [loading, setLoading] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            setDataLoaded(true)
            getData()
            count()
            barChart()
        }

    }, [user])

    const getData = async () => {
        setLoading(true)
        await getUserCount(user && user.token).then(res => {
            if (res) {
                setUserData(res.data[1].count)
                setSellerData(res.data[0].count)
            }
            console.log("User:", userData);
            console.log("Seller:", sellerData);
        }).catch(error => {
            console.log(error)
        })
        await getOrderCount(user && user.token).then(res => {
            if (res) {
                setOrderData(res.data[0].count)
            }

            console.log("Order:", orderData);
        }).catch(error => {
            console.log(error)
        })
        // await getLocationCount(user && user.token).then(res => {
        //     if (res) {
        //         setLocationData(res.data)
        //     }

        // }).catch(error => {
        //     console.log(error)
        // })
        await getProductCount(user && user.token).then(res => {
            if (res) {
                setProductData(res.data[0].count);
            }

            console.log("Product:", productData);
        }).catch(error => {
            console.log(error)
        })
        // await getOtherCount(user && user.token).then(res => {
        //     setOtherData(res.data);
        //     console.log(res.data)
        // }).catch(error => {
        //     console.log(error)
        // })
        setLoading(false)
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="dashboard" />
                <main>
                    <div class="main__container">
                        <div class="main__title">
                            {/* <img src={WelcomeBack} alt="welcome photo" /> */}
                            <div class="main__greeting">
                                <h1>Hello Codersbite</h1>
                                <p>Welcome to your admin dashboard</p>
                            </div>
                        </div>
                        <div class="counters">
                            <div class="master-card">
                                <i className="fa fa-box-open fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Orders</p>
                                    <div class="counter" data-target={orderData && orderData}>0</div>
                                </div>
                            </div>
                            <div class="master-card">
                                <i class="fas fa-pills fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Products</p>
                                    <div class="counter" data-target={productData && productData}>0</div>
                                </div>
                            </div>

                            <div class="master-card">
                                <i class="fas fa-user-tag fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Sellers</p>
                                    <div class="counter" data-target={sellerData && sellerData}>0</div>
                                </div>
                            </div>

                            <div class="master-card">
                                <i class="fas fa-user fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Users</p>
                                    <div class="counter" data-target={userData && userData}>0</div>
                                </div>
                            </div>
                        </div>
                        {/* MAIN CARDS ENDS HERE */}

                        {/* Chart */}

                        <div class="charts">
                            <div class="charts__left">
                                <div class="charts__left__title">
                                    <div>
                                        <h1>Daily Reports</h1>
                                        <p>Cupertino, California, USA</p>
                                    </div>
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                </div>
                                <div id="apex1"></div>
                            </div>

                            <div class="charts__right">
                                <div class="charts__right__title">
                                    <div>
                                        <h1>Stats Reports</h1>
                                        <p>Cupertino, California, USA</p>
                                    </div>
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                </div>

                                <div class="charts__right__cards">
                                    <div class="card1">
                                        <h1>Income</h1>
                                        <h5>₹ 75,300</h5>
                                    </div>

                                    <div class="card2">
                                        <h1>Sales</h1>
                                        <h5>₹ 124,200</h5>
                                    </div>

                                    <div class="card3">
                                        <h1>Users</h1>
                                        <h5>3900</h5>
                                    </div>

                                    <div class="card4">
                                        <h1>Orders</h1>
                                        <h5>1881</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart Ends */}

                        {/* <div className="container-fluid">
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
                    </div> */}
                    </div>
                </main>
            </div>

        </div>

    )

}

export default AdminDashboard

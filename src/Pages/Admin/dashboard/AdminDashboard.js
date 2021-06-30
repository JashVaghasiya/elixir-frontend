import React from 'react'
import { useEffect } from 'react'
import { getUserCount, getOrderCount, getProductCount, getCardDetails } from '../../../functions/admin'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { useState } from 'react'
import './css/styles.css'
import { renderAdminChart, userChart, donutUserChart } from './js/script.js'


const AdminDashboard = () => {

    const user = useSelector(state => state.user)
    const [userData, setUserData] = useState(0)
    const [sellerData, setSellerData] = useState(0)
    const [productData, setProductData] = useState(0)
    const [orderData, setOrderData] = useState(0)
    const [card, setCard] = useState()
    useEffect(() => {
        if (user && user.token) {
            getData()
            renderAdminChart()
            userChart()
            donutUserChart()

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getData = async () => {

        await getUserCount(user && user.token).then(res => {
            if (res) {
                setUserData(res.data[1].count)
                setSellerData(res.data[0].count)
            }
        }).catch(error => {
            console.log(error)
        })
        await getOrderCount(user && user.token).then(res => {
            if (res) {
                setOrderData(res.data[0].count)
            }
        }).catch(error => {
            console.log(error)
        })
        await getProductCount(user && user.token).then(res => {
            if (res) {
                setProductData(res.data[0].count);
            }
        }).catch(error => {
            console.log(error)
        })
        await getCardDetails(user && user.token).then(res => {
            if (res) {
                setCard(res.data)
                console.log(res.data)
            }
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="dashboard" />
                <main>
                    <div class="main__container">
                        <div class="main__title">
                            <div class="main__greeting">
                                <h1>Hello,</h1>
                                <p>Welcome to Admin Dashboard</p>
                            </div>
                        </div>
                        <div class="counters">
                            <div class="master-card">
                                <i className="fas fa-box-open fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Orders</p>
                                    <div class="counter" data-target={orderData && orderData}>{orderData}</div>
                                </div>
                            </div>
                            <div class="master-card">
                                <i class="fas fa-pills fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Products</p>
                                    <div class="counter" data-target={productData && productData}>{productData}</div>
                                </div>
                            </div>

                            <div class="master-card">
                                <i class="fas fa-user-tag fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Sellers</p>
                                    <div class="counter" data-target={sellerData && sellerData}>{sellerData}</div>
                                </div>
                            </div>

                            <div class="master-card">
                                <i class="fas fa-user fa-3x"></i>
                                <div class="card_inner">
                                    <p class="text-primary-p">Users</p>
                                    <div class="counter" data-target={userData && userData}>{userData}</div>
                                </div>
                            </div>
                        </div>
                        {/* MAIN CARDS ENDS HERE */}

                        {/* Chart */}

                        <div class="charts__left" style={{ marginTop: "30px" }}>
                            <div id="incomeChart"></div>
                        </div>
                        <div class="charts" style={{ marginTop: "30px" }}>
                            <div class="charts__left">
                                <div id="donutUserChart"></div>

                            </div>
                            <div class="charts__right">
                                <div class="charts__right__title">
                                    <div>
                                        <h1>Revenue Reports</h1>

                                    </div>
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                </div>

                                <div class="charts__right__cards">
                                    <div class="card1">
                                        <h1>Order</h1>
                                        <h5>₹{card && card[0].orderIncome}</h5>
                                    </div>

                                    <div class="card2">
                                        <h1>Package</h1>
                                        <h5>₹{card && card[2].packageIncome}</h5>
                                    </div>

                                    <div class="card3">
                                        <h1>Ads</h1>
                                        <h5>₹{card && card[1].adsIncome}</h5>
                                    </div>

                                    <div class="card4">
                                        <h1>Total Users</h1>
                                        <h5>{card && card[3].totalUser + card[4].totalDoctor - 2}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="charts__left" style={{ marginTop: "30px" }}>
                            <div id="apex1"></div>
                        </div>
                    </div>
                </main>
            </div>

        </div>

    )

}

export default AdminDashboard

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSellerOrder } from '../../../functions/seller'
import { Progress } from 'antd';

const SellerProfileDashboard = ({ match }) => {

    const user = useSelector(state => state.user)
    const [orderData, setOrderData] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [productData, setProductData] = useState('')
    const [userData, setUserData] = useState('')
    const [amountData, setAmountData] = useState({})
    const [adsData, setAdsData] = useState('')
    const [unscheduleData, setUnscheduleData] = useState('')

    useEffect(() => {
        if (user && user.token) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getData = async () => {
        await getSellerOrder(match.params.id).then(res => {
            if (res) {
                console.log(res)
                setOrderData(res.data[0].count)
                setAmountData(res.data[1].amount)
                setProductData(res.data[2].count)
                setUserData(res.data[3].count)
                setAdsData(res.data[4].count)
                setUnscheduleData(res.data[5].count)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <main style={{ width: "100%" }}>
            <div className="main__container">
                <Link className="form-button mt-1 mb-1" to="/admin/sellers/1">Go Back</Link>
                <div class="main__title">
                    {/* <img src={WelcomeBack} alt="welcome photo" /> */}
                    <div class="main__greeting">
                        <h1>Seller Name : {userData && user.name}</h1>
                        <p>{userData.email}</p>
                    </div>
                </div>
                <div class="counters">
                    <Link to={`/seller/orders/1`}>
                        <div class="seller-master-card">
                            <div className="seller-card-title">
                                <i className="fas fa-box-open fa-3x"></i>
                                <h5>Orders</h5>
                            </div>
                            <div class="seller-card-chart">
                                <Progress type="circle" strokeColor="#000" percent={orderData && orderData} format={percent => `${percent}`} width={80} strokeWidth={8} />
                            </div>
                        </div>
                    </Link>
                    <div class="seller-master-card">
                        <div className="seller-card-title">
                            <i class="fas fa-rupee-sign fa-3x"></i>
                            <h5>Income</h5>
                        </div>
                        <div class="seller-card-chart">
                            <Progress type="circle" strokeColor="#000" percent={amountData && amountData.incomePercentage} format={percent => `${percent} %`} width={80} strokeWidth={8} />
                        </div>
                    </div>

                    <div class="seller-master-card">
                        <div className="seller-card-title">
                            <i class="fas fa-hourglass-half fa-3x"></i>
                            <h5>Days Left</h5>
                        </div>
                        <div class="seller-card-chart">
                            <Progress type="circle" strokeColor="#000" style={{ color: "black" }} percent={userData && userData.remainingDays} format={percent => `${percent}`} width={80} strokeWidth={8} />
                        </div>
                    </div>

                    <Link to={`/seller/product`}>
                        <div class="seller-master-card">
                            <div className="seller-card-title">
                                <i class="fas fa-pills fa-3x"></i>
                                <h5>Products Left</h5>
                            </div>
                            <div class="seller-card-chart">
                                <Progress type="circle" strokeColor="#000" style={{ color: "black" }} percent={userData && userData.remainingProducts} format={percent => `${percent}`} width={80} strokeWidth={8} />
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="charts">
                    <div class="charts__left">
                        <div class="charts__left__title">
                            <div>
                                <h1>Daily Reports</h1>

                            </div>
                            <i class="fa fa-inr" aria-hidden="true"></i>
                        </div>
                        <div id="apex1"></div>
                    </div>

                    <div class="charts__right">
                        <div class="charts__right__title">
                            <div>
                                <h1>Stats Reports</h1>

                            </div>
                            <i class="fa fa-inr" aria-hidden="true"></i>
                        </div>

                        <div class="charts__right__cards">
                            <div class="card1">
                                <h2>Income</h2>
                                <h5>₹ {amountData && amountData.income}</h5>
                            </div>

                            <div class="card2">
                                <h2>Sales</h2>
                                <h5>₹ {amountData && amountData.sales}</h5>
                            </div>

                            <Link to={`/seller/ads/1`}>
                                <div class="card3">
                                    <h2>Ads</h2>
                                    <h5>{adsData && adsData}</h5>
                                </div>
                            </Link>

                            <Link to={`/seller/orders/pickup/1`}>
                                <div class="card4">
                                    <h2>UnSchedule</h2>
                                    <h5>{unscheduleData && unscheduleData}</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SellerProfileDashboard

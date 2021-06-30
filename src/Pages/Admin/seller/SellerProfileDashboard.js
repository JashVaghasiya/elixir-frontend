import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSellerOrder } from '../../../functions/seller'
import { Progress } from 'antd';
import { renderOrderChart, renderSellerChart } from '../../Admin/dashboard/js/script'
import { useSelector } from 'react-redux';

const SellerProfileDashboard = ({ match }) => {

    const user = match.params.id
    const adminToken = useSelector(state => state.user)
    const [orderData, setOrderData] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [productData, setProductData] = useState('')
    const [amountData, setAmountData] = useState({})
    const [adsData, setAdsData] = useState('')
    const [unscheduleData, setUnscheduleData] = useState('')
    useEffect(() => {
        if (adminToken && adminToken.token) {
            getData()

        }
        renderSellerChart(user && user)
        renderOrderChart(user && user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getData = async () => {
        await getSellerOrder(user && user).then(res => {
            if (res) {
                setOrderData(res.data[0].count)
                setAmountData(res.data[1].amount)
                setProductData(res.data[2].count)
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
                <div class="counters">
                    <div class="seller-master-card">
                        <div className="seller-card-title">
                            <i className="fas fa-box-open fa-3x"></i>
                            <h5>Orders</h5>
                        </div>
                        <div class="seller-card-chart">
                            <Progress type="circle" strokeColor="#64b7d8" percent={orderData && orderData} format={percent => `${percent}`} width={80} strokeWidth={8} />
                        </div>
                    </div>
                    <div class="seller-master-card">
                        <div className="seller-card-title">
                            <i class="fas fa-rupee-sign fa-3x"></i>
                            <h5>Income</h5>
                        </div>
                        <div class="seller-card-chart">
                            <Progress type="circle" strokeColor="#2a9d8f" percent={amountData && amountData.incomePercentage} format={percent => `${percent} %`} width={80} strokeWidth={8} />
                        </div>
                    </div>
                </div>
                {/* MAIN CARDS ENDS HERE */}

                {/* Chart */}
                <div class="charts__left" style={{ marginTop: "50px" }}>
                    <div id="apex1"></div>
                </div>
                <div class="charts">
                    <div class="charts__left">
                        <div id="orderChart"></div>
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
                                <h5>₹ {amountData ? amountData.income : 0}</h5>
                            </div>

                            <div class="card2">
                                <h2>Sales</h2>
                                <h5>₹ {amountData ? amountData.sales : 0}</h5>
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
                                    <h5>{unscheduleData ? unscheduleData : 0}</h5>
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

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Col, Row } from 'react-bootstrap'
import { getSeller } from '../../../functions/seller'
import { activateUser, deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import SellerHeader from './SellerHeader'

import { Link } from 'react-router-dom'

const Activated = () => {

    const [sellers, setSellers] = useState([])
    const user = useSelector(state => state.user)

    const [activeId, setActiveId] = useState("")
    const [loading, setLoading] = useState(false)
    const [loaded, setLoader] = useState(true)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        if (user && user._id) {
            setLoading(true)
            getSeller(null, null, null, null, user && user.token).then(res => {
                setSellers(res.data)
                console.log(res.data)
                console.log(sellers)
                const deactivateSellers = res.data && res.data.filter(seller => seller.activated === true)
                setSellers(deactivateSellers)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const activate = async () => {
        await deactivateUser(activeId, user.token).then(res => {
            if (res) {
                setSellers(sellers.filter(p => p._id !== activeId))
            }
            setActiveId("")
        })
    }

    if (activeId) {
        activate()
        setActiveId("")
    }



    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="seller" />
                <main>
                    <div className="main__container">
                        <SellerHeader activated="activated" />
                        <h3 className="mb-3">Activate Sellers</h3>
                        <div className="white2"></div>


                        <Row>
                            {
                                loading ? "Loading..." : user && sellers.length > 0 ? sellers.map(p => (
                                    <Col className="float-left" xm="12" sm="12" md="5" xl="4">
                                        <div className="m-2">
                                            <ActivationCard key={p._id} p={p} setId={setActiveId} />
                                        </div>
                                    </Col>
                                )) : <div>
                                    <p className="m-3">No Activated Sellers</p>
                                </div>
                            }
                        </Row>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Activated
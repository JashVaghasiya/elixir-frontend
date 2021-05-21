import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Col, Row } from 'react-bootstrap'
import { getSeller } from '../../../functions/seller'
import { deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import SellerHeader from './SellerHeader'

const Activated = () => {

    const [sellers, setSellers] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [activeId, setActiveId] = useState("")


    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProducts = () => {

        if (user && user._id) {
            setLoading(true)
            getSeller(null, null, null, null, user && user.token).then(res => {
                setSellers(res.data)
                setLoading(false)
                const deactivateSellers = res.data && res.data.filter(seller => seller.activated === true)
                setSellers(deactivateSellers)
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
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {
                                    user && sellers.length > 0 ? sellers.map(p => (
                                        <Col key={p._id} className="float-left" sm={12} md={6} lg={4} xl={4}>
                                            <ActivationCard user={user} p={p} setId={setActiveId} />
                                        </Col>
                                    )) : <div>
                                        <p className="m-3 text-white">No Activated Sellers</p>
                                    </div>
                                }
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Activated


// 12 12 5 4
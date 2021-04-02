import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Row } from 'react-bootstrap'
import { getSeller } from '../../../functions/seller'
import { activateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import SellerHeader from './SellerHeader'

const Deactivate = () => {

    const [sellers, setSellers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")
    const [loaded, setLoader] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSellers()
    }, [])

    const getSellers = () => {

        if (user && user._id) {
            setLoading(true)
            getSeller(user && user.token).then(res => {
                setSellers(res.data)
                const deactivateSellers = res.data && res.data.filter(seller => seller.activated === false)
                setSellers(deactivateSellers)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const activate = async () => {
        await activateUser(activeId, user.token).then(res => {
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
                        <h3 className="mb-3">Deactivate Sellers</h3>
                        <div className="white2"></div>
                        <SellerHeader active="seller" />

                        <Row>
                            {
                                loading ? "Loading..." : user && sellers && sellers.length > 0 ? sellers.map(p => (
                                    <div className="mt-22">
                                        <ActivationCard p={p} key={p._id} setId={setActiveId} />
                                    </div>
                                )) : <p className="m-3">No Deactivated Sellers</p>
                            }
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Deactivate
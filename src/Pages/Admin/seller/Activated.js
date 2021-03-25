import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Row } from 'react-bootstrap'
import { getSeller } from '../../../functions/seller'
import { activateUser, deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const Activated = () => {

    const [sellers, setSellers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")
    const [loaded, setLoader] = useState(true)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        if (user && user._id) {
            getSeller(user && user.token).then(res => {
                setSellers(res.data)
                console.log(res.data)
                console.log(sellers)
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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3 className="mb-3">Activate Sellers</h3>
                <Row>
                    {
                        user && sellers.length > 0 ? sellers.map(p => (
                            <ActivationCard key={p._id} p={p} setId={setActiveId} />
                        )) : <div>
                            <p className="m-3">No Active Sellers</p></div>
                    }
                </Row>
            </div>
        </div>
    )
}

export default Activated
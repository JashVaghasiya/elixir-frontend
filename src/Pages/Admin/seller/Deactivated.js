import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Row } from 'react-bootstrap'
import { getSeller } from '../../../functions/seller'
import { activateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/AdminSideNav'

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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3 className="mb-3">Deactivate Sellers</h3>
                <Row>
                    {
                        user && sellers && sellers.length > 0 ? sellers.map(p => (
                            <ActivationCard p={p} key={p._id} setId={setActiveId} />
                        )) : <p className="m-3">Empty</p>
                    }
                </Row>
            </div>
        </div>
    )
}

export default Deactivate
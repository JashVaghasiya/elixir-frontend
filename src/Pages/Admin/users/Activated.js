import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Col, Row } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import { deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import UserHeader from './UserHeader'

const Activated = () => {

    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        if (user && user._id) {
            setLoading(true)
            getUsers(null, null, null, null, user && user.token).then(res => {
                setUsers(res.data)
                const deactivateUsers = res.data && res.data.filter(user => user.activated === true)
                setUsers(deactivateUsers)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const activate = async () => {
        await deactivateUser(activeId, user.token).then(res => {
            if (res) {
                setUsers(users.filter(p => p._id !== activeId))
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
                <AdminSideNav active="user" />
                <main>
                    <div className="main__container">
                        <UserHeader activated="activated" />
                        <h3>Activate Users</h3>
                        <div className="white2"></div>
                        <Row>

                            {

                                loading ? "Loading..." : user && users.length > 0 ? users.map(p => (
                                    <Col className="float-left" xm="12" sm="12" md="5" xl="4">
                                        <div className="mt-2">
                                            <ActivationCard key={p._id} p={p} setId={setActiveId} />
                                        </div>
                                    </Col>
                                )) : <div>
                                    <p className="m-3">No Active Sellers</p></div>

                            }

                        </Row>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Activated
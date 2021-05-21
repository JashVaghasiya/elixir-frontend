import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Col, Row } from 'react-bootstrap'
import { activateUser, getUsers } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import UserHeader from './UserHeader'

const Deactivate = () => {

    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getSellers = () => {
            if (user && user._id) {
                setLoading(true)
                getUsers(null, null, null, null, user && user.token).then(res => {
                    setUsers(res.data)
                    const deactivateSellers = res.data && res.data.filter(user => user.activated === false)
                    setUsers(deactivateSellers)
                    setLoading(false)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
        getSellers()
    }, [user])



    const activate = async () => {
        await activateUser(activeId, user.token).then(res => {
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
                        <UserHeader activated="deactivate" />
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {
                                    user && users && users.length > 0 ? users.map(p => (
                                        <Col key={p._id} className="float-left mb-2" sm={12} md={6} lg={4} xl={4}>
                                            <ActivationCard p={p} user={user} setId={setActiveId} />
                                        </Col>
                                    )) : <p className="m-3 text-white">No deactivated Users</p>
                                }
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Deactivate
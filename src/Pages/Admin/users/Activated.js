import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Col, Row } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import { deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import UserHeader from './UserHeader'

const Activated = () => {

    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUser = () => {
            if (user && user._id) {
                setLoading(true)
                getUsers(null, null, null, null, user && user.token).then(res => {
                    setLoading(false)
                    setUsers(res.data)
                    const deactivateUsers = res.data && res.data.filter(user => user.activated === true)
                    setUsers(deactivateUsers)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
        getUser()
    }, [user])



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
                        {loading ? <Loader color="white" /> :
                            <Row>

                                {

                                    user && users.length > 0 ? users.map(p => (
                                        <Col key={p._id} className="float-left mb-2" sm={12} md={6} lg={4} xl={4}>
                                            <ActivationCard user={user} p={p} setId={setActiveId} />
                                        </Col>
                                    )) : <div>
                                        <p className="m-3 text-white">No Activated Users</p></div>

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
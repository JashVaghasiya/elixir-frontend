import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Row } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import { deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'

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
            getUsers(user && user.token).then(res => {
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
                    <div className="container-fluid">
                        <h3 className="mb-3">Activate Users</h3>

                        <Row>
                            {
                                loading ? "Loading..." : user && users.length > 0 ? users.map(p => (
                                    <div className="mt-2">
                                        <ActivationCard key={p._id} p={p} setId={setActiveId} />
                                    </div>
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
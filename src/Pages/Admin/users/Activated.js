import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Row } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import { deactivateUser } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const Activated = () => {

    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")

    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        if (user && user._id) {
            getUsers(user && user.token).then(res => {
                setUsers(res.data)
                const deactivateUsers = res.data && res.data.filter(user => user.activated === true)
                setUsers(deactivateUsers)
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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3 className="mb-3">Activate Users</h3>
                <Row>
                    {
                        user && users.length > 0 ? users.map(p => (
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
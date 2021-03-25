import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivationCard from '../../../components/cards/ActivationCard'
import { Row } from 'react-bootstrap'
import { activateUser, getUsers } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const Deactivate = () => {

    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const [activeId, setActiveId] = useState("")


    useEffect(() => {
        getSellers()
    }, [])

    const getSellers = () => {

        if (user && user._id) {

            getUsers(user && user.token).then(res => {
                setUsers(res.data)
                const deactivateSellers = res.data && res.data.filter(user => user.activated === false)
                setUsers(deactivateSellers)
            }).catch(err => {
                console.log(err)
            })
        }
    }

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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3 className="mb-3">Deactivate Users</h3>
                <Row>
                    {
                        user && users && users.length > 0 ? users.map(p => (
                            <ActivationCard p={p} key={p._id} setId={setActiveId} />
                        )) : <p className="m-3">Empty</p>
                    }
                </Row>
            </div>
        </div>
    )
}

export default Deactivate
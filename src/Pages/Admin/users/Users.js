import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsers, activateUser, deactivateUser } from '../../../functions/user'
import { Switch, Card } from 'antd';


const { Meta } = Card;

const Users = () => {

    const [users, setUsers] = useState([])
    const [checked, setChecked] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        await getUsers(user && user.token).then(res => {
            setUsers(res.data)
        }).catch(error =>
            console.log('User Error--->', error)
        )
    }

    const switchHandler = (id) => {
        console.log(id)
        setChecked(true)
        activateUser(user && user.token, id).then(res => {
            console.log("product has been removed")
            loadUsers()
        }).catch(error => {
            console.log("error while deleting user--->", error)
        })
    }

    return (
        <div>
            {users.length > 0 && users.map(u => (
                <Card style={{ width: 300, marginTop: 16 }}>
                    <Switch onChange={() => switchHandler(u._id)} />
                    <Meta
                        title={u.email}
                        description={u.createdAt}
                    />
                </Card>
            ))}
        </div>
    )
}

export default Users

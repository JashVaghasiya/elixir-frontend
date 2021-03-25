import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSeller } from '../../../functions/seller'
import { Switch, Card, } from 'antd';
import { deactivateUser } from '../../../functions/user';
const { Meta } = Card;

const Seller = () => {

    const [sellers, setSellers] = useState([])
    const [loading, setLoading] = useState(true)
    const [checked, setChecked] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        loadSeller()
    }, [user])

    const loadSeller = async () => {
        console.log(user)
        await getSeller(user && user.token).then(res => {
            setSellers(res.data)
            console.log('got all seller')
        }).catch(error => {
            console.log(error)
        })
    }

    const switchHandler = (id) => {
        setLoading(false)
        setChecked(true)
        deactivateUser(user && user.token, id).then(res => {
            console.log("seller has been disabled")
            loadSeller()
        }).catch(error => {
            console.log("error while updating seller--->", error)
        })
    }

    return (
        <div>
            {sellers.length > 0 && sellers.map(s => (
                <Card style={{ width: 300, marginTop: 16 }}>
                    <Switch checked={loading} onChange={() => switchHandler(s._id)} />
                    <Meta
                        title={s.email}
                        description={s.createdAt}
                    />
                </Card>
            ))}
        </div>
    )
}

export default Seller

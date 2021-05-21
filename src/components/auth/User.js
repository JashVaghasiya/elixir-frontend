import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router'
import Code403 from '../../Pages/error/403'

const User = ({ ...rest }) => {
    const user = useSelector(state => state.user)
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.role === "user") {
            setOk(true)
        }
    }, [ok, user])

    return ok ? <Route {...rest} /> : <Code403 />
}

export default User

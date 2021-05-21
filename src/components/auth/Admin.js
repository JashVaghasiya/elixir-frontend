import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Code403 from '../../Pages/error/403'

const Admin = ({ ...rest }) => {
    const user = useSelector(state => state.user)
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.role === "admin") {
            setOk(true)
        }
    }, [ok, user])

    return ok ? <Route exact {...rest} /> : <Code403 />

}

export default Admin

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Code403 from '../../Pages/error/403'

const Agency = ({ ...rest }) => {
    const user = useSelector(state => state.user)
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.role === "agency") {
            setOk(true)
        }
    }, [ok, user])

    return ok ? <Route exact {...rest} /> : <Code403 />
}

export default Agency

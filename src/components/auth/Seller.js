import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Code403 from '../../Pages/error/403'

const Seller = ({ ...rest }) => {
    const seller = useSelector(state => state.user)
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (seller && seller.token && seller.role === "seller") {
            setOk(true)
        } else {

        }
    }, [ok, seller])

    return ok ? <Route {...rest} /> : <Code403 />

}

export default Seller

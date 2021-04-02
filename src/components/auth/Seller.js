import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Code404 from '../../Pages/error/404'

const Seller = ({ ...rest }) => {
    const seller = useSelector(state => state.seller)
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (seller && seller.token && seller.role === "seller") {
            setOk(true)
        } else {

        }
    }, [ok, seller])

    return ok ? <Route {...rest} /> : <Code404 />

}

export default Seller

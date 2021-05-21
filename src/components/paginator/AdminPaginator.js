import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Paginator = ({ setLimit, pages, pageNumber, role }) => {


    const [page, setPage] = useState(1)
    useEffect(() => {

    }, [page])

    const decrement = () => {
        if (page !== 1) return setPage(page - 1)
    }

    const increment = () => {
        if (pages !== page) return setPage(page + 1)
    }


    return (pages > 1 && (

        <div style={{ display: "flex" }}>
            <Link disabled={page === 1} onClick={() => decrement()} className="form-button mr-2" to={role === "seller" ? `/admin/sellers/${page - 1}` : role === "order" ? `/admin/orders/${page - 1}` : role === "product" ? `/admin/product/${page - 1}` : role === "ads" ? `/admin/ads/${page - 1}` : `/admin/users/${page - 1} `}>{"<"}</Link>
            <Link disabled={pages === page} onClick={() => increment()} className="form-button mr-2 text-white" to={role === "seller" ? `/admin/sellers/${page + 1}` : role === "order" ? `/admin/orders/${page + 1}` : role === "product" ? `/admin/product/${page + 1}` : role === "ads" ? `/admin/ads/${page + 1}` : `/admin/users/${page + 1} `}>{">"}</Link>

            <select style={{ width: "100px", height: "50px", background: "#414141", color: "white" }} onChange={e => setLimit(e.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
            </select>
            <p className="text-white m-2">{pageNumber} of {pages}</p>
        </div>
    ))
}

export default Paginator

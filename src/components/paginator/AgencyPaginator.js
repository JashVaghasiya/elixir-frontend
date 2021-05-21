import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AgencyPaginator = ({ setLimit, pages, pageNumber, role }) => {

    const [page, setPage] = useState(1)

    useEffect(() => {

    }, [page])

    const decrement = () => {
        if (page !== 1) return setPage(page - 1)
    }

    const increment = () => {
        if (pages !== page) return setPage(page + 1)
    }

    return (
        (pages > 1 && <div>

            <Link disabled={page === 1} onClick={() => decrement()} className="btn btn-dark text-white" to={role === "order" ? `/agency/${page - 1}` : role === "pickup" ? `/agency/pickup/${page - 1}` : `/agency/manage/${page - 1}`}>{"<"}</Link>
            <Link disabled={pages === page} onClick={() => increment()} className="btn btn-dark text-white" to={role === "order" ? `/agency/${page + 1}` : role === "pickup" ? `/agency/pickup/${page + 1}` : `/agency/manage/${page + 1}`}>{">"}</Link>
            <select onChange={(e) => setLimit(e.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
            </select>
            <p className="text-dark">{pageNumber} of {pages}</p>

        </div>)
    )
}

export default AgencyPaginator

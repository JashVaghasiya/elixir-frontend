import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HomePaginator = ({ pages, pageNumber }) => {

    const [page, setPage] = useState(1)
    useEffect(() => {

    }, [page])

    const decrement = () => {
        window.scrollTo(0, 250)
        if (page !== 1) return setPage(page - 1)
    }

    const increment = () => {
        window.scrollTo(0, 250)
        if (pages !== page) return setPage(page + 1)
    }

    return (pages > 1 && (
        <div style={{ display: "flex" }}>
            <Link disabled={page === 1} onClick={() => decrement()} className="form-button mr-2" to={`/page/${page - 1}`}>{"<"}</Link>
            <Link disabled={pages === page} onClick={() => increment()} className="form-button" to={`/page/${page + 1}`}>{">"}</Link>
            <h6 className="text-dark" style={{ margin: "14px", fontSize: "16px", fontWeight: "600", color: "grey" }}>{pageNumber} of {pages}</h6>
        </div>
    ))
}

export default HomePaginator
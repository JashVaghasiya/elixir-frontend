import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginator = ({ pages, pageNumber, role }) => {
    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1} to={role === "seller" ? `/admin/sellers/${x + 1}` : role === "order" ? `/admin/sellers/${x + 1}` : role === "product" ? `/admin/product/${x + 1}` : role === "ads" ? `/admin/ads/${x + 1}` : `/admin/users/${x + 1} `}>
                    <Pagination.Item active={x + 1 === pageNumber}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    ))
}

export default Paginator

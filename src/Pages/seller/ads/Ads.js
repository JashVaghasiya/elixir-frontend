import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Paginator from '../../../components/paginator/SellerPaginator'
import SellerSideNav from '../../../components/nav/Seller'
import { getSellerAds } from '../../../functions/ads'
import SellerHeader from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'

const Ads = ({ match }) => {
    const seller = useSelector(state => state.user)
    const [ads, setAds] = useState()
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [limit, setLimit] = useState(10)
    const [sortName, setSortName] = useState("createdAt")
    const [manner, setManner] = useState(-1)
    const pageNumber = match.params.pageNumber || 1
    useEffect(() => {
        loadOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seller, limit, pageNumber, manner, sortName])

    const loadOrders = async () => {

        setLoading(true)
        await getSellerAds(limit, pageNumber, sortName, manner, seller && seller._id, seller && seller.token).then(res => {
            setAds(res.data.ads)
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const setSort = (name) => {
        setSortName(name)
        if (manner === 1) {
            setManner(-1)
        } else {
            setManner(1)
        }
    }


    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SellerSideNav active="ads" />
                <main>
                    <div className="main__container">
                        <h3 className="mb-3">Advertisement</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th>Ads Id <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                        <th>ProductId <i className="fas fa-sort" onClick={() => setSort("productId")}></i></th>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Remaining Days <i className="fas fa-sort" onClick={() => setSort("expireAfter")}></i></th>
                                        <th>Paid At <i className="fas fa-sort" onClick={() => setSort("createdAt")}></i></th>
                                        <th>Amount Paid <i className="fas fa-sort" onClick={() => setSort("amountPaid")}></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ads && ads.length > 0 && ads.map(o => (
                                        <tr key={o._id}>
                                            <td>{o._id}</td>
                                            <td>{o.productId._id}</td>
                                            <td><img height="100" width="100" src={o.productId.images[0].url} alt={o.productId.images[0].name} /></td>
                                            <td>{o.productId.name}</td>
                                            <td>{o.expireAfter}</td>
                                            <td>{o.createdAt.substr(0, 10)}</td>
                                            <td>{o.amountPaid}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                        {pageData && pageData.pages > 1 ? <Paginator role="ads" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} /> : ''}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Ads

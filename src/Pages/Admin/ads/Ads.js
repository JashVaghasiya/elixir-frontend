import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Paginator from '../../../components/Paginator'
import { getAds } from '../../../functions/ads'

const Ads = ({ match }) => {

    const [ads, setAds] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [sortName, setSortName] = useState("_id")
    const [manner, setManner] = useState(1)

    const pageNumber = match.params.pageNumber || 0

    useEffect(() => {
        loadSeller()
    }, [pageNumber, manner, sortName])

    const loadSeller = async () => {
        setLoading(true)
        await getAds(3, pageNumber, sortName, manner, user && user.token).then(res => {
            setAds(res.data.ads)
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            setLoading(false)
        }).catch(error => {
            console.log(error)
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
        <div id="body" >
            <div className="container-main">
                <Header />
                <AdminSideNav active="ads" />
                <main>
                    <div className="main__container">
                        <h3>Ads</h3>
                        <div className="white2"></div>
                        <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                            <thead>
                                <tr>
                                    <th>Ad Id <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                    <th>Seller Id <i className="fas fa-sort" onClick={() => setSort("sellerId")}></i></th>
                                    <th>Seller Name</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Days Remaining <i className="fas fa-sort" onClick={() => setSort("remainingDays")}></i></th>
                                    <th>Paid <i className="fas fa-sort" onClick={() => setSort("paid")}></i></th>
                                    <th>Amount <i className="fas fa-sort" onClick={() => setSort("amount")}></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads && ads.length > 0 && ads.map(u => (
                                    <tr key={u._id}>
                                        <td>{u._id}</td>
                                        <td>{u.sellerId}</td>
                                        <td>{u.sellerName}</td>
                                        <td>{u.productId}</td>
                                        <td>{u.productName}</td>
                                        <td>{u.remainingDays}</td>
                                        <td>{u.paidAt}</td>
                                        <td>{u.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginator role="ads" pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Ads

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Paginator from '../../../components/paginator/AdminPaginator'
import { getAds, updateAdsRate } from '../../../functions/ads'
import { getPackages } from '../../../functions/package'
import Loader from '../../../components/Loader'
import { Link } from 'react-router-dom'

const Ads = ({ match }) => {

    const [ads, setAds] = useState([])
    const [rate, setRate] = useState()
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState()
    const [sortName, setSortName] = useState("createdAt")
    const [manner, setManner] = useState(-1)
    const [limit, setLimit] = useState(10)

    const pageNumber = match.params.pageNumber || 0

    useEffect(() => {
        const loadAds = async () => {
            setLoading(true)
            await getPackages().then(res => {
                console.log(res.data);
                setRate(res.data[0].adsRate)
            }).catch(err => {
                console.log(err)
            })
            await getAds(limit, pageNumber, sortName, manner, user && user.token).then(res => {
                setAds(res.data.ads)
                setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
        }
        loadAds()
    }, [user, limit, pageNumber, manner, sortName])



    const updateRate = async () => {
        console.log(rate)
        await updateAdsRate(rate, user && user.token).then(res => {
            console.log(res)
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
                        <h3>Advertisement</h3>
                        <div className="white2"></div>
                        {
                            loading ? <Loader color="white" /> :
                                <>
                                    <div class="content">
                                        <div class="form">

                                            <div class="input-div focus">
                                                <div>
                                                    <h5>Enter City Name</h5>
                                                    <input type="text" class="input-tag" maxlength="25" id="txtName" value={rate} onChange={e => setRate(e.target.value)} />
                                                </div>
                                            </div>
                                            <input onClick={() => updateRate()} class="btn-main" value="Update Ads Rate" />
                                        </div>
                                    </div>

                                    <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                        <thead>
                                            <tr>
                                                <th>Seller Id <i className="fas fa-sort" onClick={() => setSort("sellerId")}></i></th>
                                                <th>Seller Name</th>
                                                <th>Product Name</th>
                                                <th>Days<i className="fas fa-sort" onClick={() => setSort("remainingDays")}></i></th>
                                                <th>Paid <i className="fas fa-sort" onClick={() => setSort("paid")}></i></th>
                                                <th>Amount <i className="fas fa-sort" onClick={() => setSort("amount")}></i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ads && ads.length > 0 && ads.map(u => (
                                                <tr key={u._id}>
                                                    <td>{u.seller._id}</td>
                                                    <td>{u.seller.email}</td>
                                                    <td><Link to={`/product/${u.productId._id}`}><p>{u.productId.name}</p></Link></td>
                                                    <td>{u.expireAfter}</td>
                                                    <td>{u.paidAt.substr(0, 10)}</td>
                                                    <td>{u.amountPaid}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </>
                        }
                        <Paginator role="ads" setLimit={setLimit} pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Ads

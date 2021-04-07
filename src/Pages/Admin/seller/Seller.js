import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSeller } from '../../../functions/seller'
import { Table } from 'react-bootstrap';
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { Link } from 'react-router-dom';
import '../dashboard/css/styles.css'
import SellerHeader from './SellerHeader';
import Paginator from '../../../components/Paginator';


const Seller = ({ match }) => {

    const [sellers, setSellers] = useState([])
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
        await getSeller(3, pageNumber, sortName, manner, user && user.token).then(res => {
            setSellers(res.data.sellers)
            setPageData({ pages: res.data.pages, pageNumber: res.data.pageNumber })
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const setSort = (name) => {
        console.log("In")
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
                <Header />
                <AdminSideNav active="seller" />
                <main>
                    <div className="main__container">
                        <SellerHeader activated="all" />
                        <h3>Sellers</h3>
                        <div className="white2"></div>
                        <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                            <thead>
                                <tr>
                                    <th >Seller Id<i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                    <th>Name<i className="fas fa-sort" onClick={() => setSort("name")}></i></th>
                                    <th>Email<i className="fas fa-sort" onClick={() => setSort("email")}></i></th>
                                    <th>Package Name<i className="fas fa-sort" onClick={() => setSort("package")}></i></th>
                                    <th>Remaining Days<i className="fas fa-sort" onClick={() => setSort("remainingDays")}></i></th>
                                    <th>Remaining Products<i className="fas fa-sort" onClick={() => setSort("remainingProducts")}></i></th>
                                    <th>Active or Deactivated<i className="fas fa-sort" onClick={() => setSort("activated")}></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? "Loading..." : sellers && sellers.length > 0 && sellers.map(u => (
                                    <tr key={u._id}>
                                        <td>{u._id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.package}</td>
                                        <td>{u.remainingDays}</td>
                                        <td>{u.remainingProducts}</td>
                                        <td>{u.activated ? "Active" : "Deactivated"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginator role="seller" pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Seller



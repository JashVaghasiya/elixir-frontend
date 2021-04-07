import { Row, Col } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ApprovalCard from '../../../components/cards/ApprovalCard'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getUnapprovedProduct, approveProduct, rejectProduct } from '../../../functions/product'
import { Link } from 'react-router-dom'

const UnapprovedProduct = ({ history }) => {

    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoader] = useState(true)
    const [rejectId, setRejectId] = useState("")
    const [approveId, setApproveId] = useState("")

    useEffect(() => {
        if (user && user._id && loaded) {
            setLoader(false)
            getProducts()
        }
    }, [loaded, user])

    const getProducts = async () => {
        setLoading(true)
        await getUnapprovedProduct(user.token).then(res => {
            setProducts(res.data)
            setLoading(false)
        }).catch(err => {
            console.log("Error in Getting Unapproved Products", err)
        })
    }

    const approveProducts = async () => {
        await approveProduct(approveId, user.token).then(res => {
            setApproveId("")
            const newProducts = products.filter(p => p._id !== approveId)
            setProducts(newProducts)
        })
    }

    if (approveId) {
        approveProducts()
    }

    const rejectProducts = async () => {
        await rejectProduct(rejectId, user.token).then(res => {
            setRejectId("")
            const newProducts = products.filter(p => p._id !== rejectId)
            setProducts(newProducts)
        })
    }

    if (rejectId) {
        rejectProducts()
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="product" />
                <main>
                    <div className="main__container">
                        <div className="header__link__container">
                            <div id="all" className="header__link"><Link to="/admin/product/1"><p>All Products</p></Link></div>
                            <div id="unapproved" className="header__link header__active__link"><Link to="/admin/product/unapproved"><p>Unapproved Products</p></Link></div>
                        </div>
                        <h3>Unapproved Products</h3>
                        <div className="white2"></div>
                        <Row>
                            {
                                loading ? <p className="m-3">Loading...</p> :
                                    user && products.length > 0 ? products.map(p => (
                                        <div className="m-2">
                                            <ApprovalCard key={p._id} p={p} approve={setApproveId} reject={setRejectId} />
                                        </div>
                                    )) : <p className="m-3">No Unapproved Products</p>
                            }
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UnapprovedProduct

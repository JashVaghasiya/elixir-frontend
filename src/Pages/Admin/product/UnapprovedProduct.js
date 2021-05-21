import { Row, Col, Alert } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ApprovalCard from '../../../components/cards/ApprovalCard'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import { sendRejectedProduct } from '../../../functions/email'
import { getUnapprovedProduct, approveProduct, rejectProduct } from '../../../functions/product'
import { Link } from 'react-router-dom'

const UnapprovedProduct = ({ history }) => {

    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoader] = useState(true)
    const [rejectId, setRejectId] = useState(null)
    const [error, setError] = useState(null)
    const [approveId, setApproveId] = useState(null)

    useEffect(() => {
        if (user && user._id && loaded) {
            setLoader(false)
            getProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded, user])

    const getProducts = async () => {
        setLoading(true)
        await getUnapprovedProduct(user.token).then(res => {
            setProducts(res.data)
            console.log(res.data);
            setLoading(false)
        }).catch(err => {
            console.log("Error in Getting Unapproved Products", err)
        })
    }

    const approveProducts = async () => {
        await approveProduct(approveId, user.token).then(res => {
            setApproveId(null)
            const newProducts = products.filter(p => p._id !== approveId)
            setProducts(newProducts)
        })
    }

    if (approveId !== null) {
        approveProducts()
    }

    const rejectProducts = async () => {
        const reason = prompt("Please enter your name:", "Harry Potter");
        if (reason == null || reason === "") {
            setError("Enter Reason for rejection in Prompt")
        } else {
            await rejectProduct(rejectId._id, user.token).then(res => {
                setRejectId(null)
                const newProducts = products.filter(p => p._id !== rejectId._id)
                setProducts(newProducts)

            })
            await sendRejectedProduct(rejectId.seller.name, rejectId.seller.email, rejectId._id, reason)
        }

    }

    if (rejectId !== null) {
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
                        {error !== null && <Alert variant="dark" className="m-3">{error}</Alert>}
                        {loading ? <Loader color="white" /> :
                            <Row>
                                {

                                    user && products.length > 0 ? products.map(p => (
                                        <Col key={p._id} className="mt-2" sm={12} md={6} lg={6} xl={4}>
                                            <ApprovalCard p={p} approve={setApproveId} reject={setRejectId} />
                                        </Col>
                                    )) : <p className="m-3 text-white">No Unapproved Products</p>
                                }
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UnapprovedProduct

import { Row, Col } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ApprovalCard from '../../../components/cards/ApprovalCard'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getUnapprovedProduct, approveProduct, rejectProduct } from '../../../functions/product'

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
                    <div className="container-fluid">
                        <h3 className="mb-3">Unapproved Products</h3>
                        <div className="container-fluid">
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
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UnapprovedProduct

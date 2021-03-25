import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ApprovalCard from '../../../components/cards/ApprovalCard'
import AdminSideNav from '../../../components/nav/AdminSideNav'
import { getUnapprovedProduct, activateProduct } from '../../../functions/product'

const UnapprovedProduct = ({ history }) => {

    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user)
    const [activationId, setActivationId] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProducts()
    }, [user])

    const getProducts = async () => {
        setLoading(true)
        console.log(user.token);
        await getUnapprovedProduct(user.token).then(res => {
            console.log(res);
            setProducts(res.data.filter(p => p.approved === false))
            setLoading(false)
        }).catch(err => {
            console.log("Error in Getting Unapproved Products", err)
        })
    }





    return (
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3 className="mb-3">Unapproved Products</h3>
                {
                    loading ? "Loading..." :
                        user && products.length > 0 ? products.map(p => (
                            <ApprovalCard p={p} history={history} setActivationId={setActivationId} />
                        )) : ''
                }
            </div>
        </div>
    )
}

export default UnapprovedProduct

import React, { useEffect, useState } from 'react'
import '../../css/Package.css'
import { useSelector } from 'react-redux'
import { getPackages } from '../../functions/package'
import '../../css/SellerPricingCard.css'
const Package = ({ history }) => {

    const [pack1, setPack1] = useState([])
    const [pack2, setPack2] = useState([])
    const [pack3, setPack3] = useState([])

    const seller = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0)
        getPacks()
    }, [])

    const getPacks = async () => {
        await getPackages().then(res => {
            setPack1(res.data[0])
            setPack2(res.data[1])
            setPack3(res.data[2])
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSpark = () => {
        window.localStorage.setItem("Package Id", pack1._id)
        if (seller && seller._id) {
            history.push('/payment/package')
        } else {
            history.push('/seller/registration')
        }

    }

    const handleFlame = () => {
        window.localStorage.setItem("Package Id", pack2._id)
        if (seller && seller._id) {
            history.push('/payment/package')
        } else {
            history.push('/seller/registration')
        }
    }

    const handleBlaze = () => {
        window.localStorage.setItem("Package Id", pack3._id)
        if (seller && seller._id) {
            history.push('/payment/package')
        } else {
            history.push('/seller/registration')
        }
    }

    return (
        <>
            <div class="wrapper-seller-pricing-card">
                <div class="seller-pricing-card">
                    <div class="seller-pricing-card-title">
                        <h3>{pack1.name}</h3>
                    </div>
                    <div class="seller-pricing-card-price">
                        <h1>
                            ₹{pack1.price}
                        </h1>
                    </div>
                    <div class="seller-pricing-card-description">
                        <ul>
                            <li>{pack1.products} Products</li>
                            <li>{pack1.duration} Days Hosting of Product</li>
                            <li>{pack1.ads ? "Advertisement" : <del>Advertisement</del>}</li>
                            <li>24/7 Tech Support</li>
                            <li>Daily Backups</li>
                        </ul>
                    </div>

                    <button type="button" className="btn btn-block btn-dark p-3" onClick={() => handleSpark()}>Get {pack1.name}</button>

                </div>
                <div class="seller-pricing-card">
                    <div class="seller-pricing-card-ribbon">
                        <span>most popular</span>
                    </div>
                    <div class="seller-pricing-card-title">
                        <h3>{pack3.name}</h3>
                    </div>
                    <div class="seller-pricing-card-price">
                        <h1>
                            ₹{pack3.price}
                        </h1>
                    </div>
                    <div class="seller-pricing-card-description">
                        <ul>
                            <li>{pack3.products} Products</li>
                            <li>{pack3.duration} Days Hosting of Product</li>
                            <li>{pack3.ads ? "Advertisement" : <del>Advertisement</del>}</li>
                            <li>24/7 Tech Support</li>
                            <li>Daily Backups</li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-block btn-dark p-3" onClick={() => handleBlaze()}>Get {pack3.name}</button>
                </div>
                <div class="seller-pricing-card">
                    <div class="seller-pricing-card-title">
                        <h3>{pack2.name}</h3>
                    </div>
                    <div class="seller-pricing-card-price">
                        <h1>
                            ₹{pack2.price}
                        </h1>
                    </div>
                    <div class="seller-pricing-card-description">
                        <ul>
                            <li>{pack2.products} Products</li>
                            <li>{pack2.duration} Days Hosting of Product</li>
                            <li>{pack2.ads ? "Advertisement" : <del>Advertisement</del>}</li>
                            <li>24/7 Tech Support</li>
                            <li>Daily Backups</li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-block btn-dark p-3" onClick={() => handleFlame()}>Get {pack2.name}</button>
                </div>
            </div>
        </>
    )
}

export default Package

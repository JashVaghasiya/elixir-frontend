import React, { useEffect, useState } from 'react'
import './Package.css'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getPackages } from '../../functions/package'
const Package = ({ history }) => {

    const [packages, setPackages] = useState({})
    const [pack1, setPack1] = useState([])
    const [pack2, setPack2] = useState([])
    const [pack3, setPack3] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        getPacks()
    }, [])

    const getPacks = async () => {
        await getPackages().then(res => {
            console.log(res.data);
            setPack1(res.data[0])
            setPack2(res.data[1])
            setPack3(res.data[2])
        }).catch(err => {
            console.log(err)
        })
    }

    const handleBasic = () => {
        setPackages({
            package: pack1.name,
            totalProduct: pack1.products,
            totalDays: pack1.duration,
            price: pack1.price
        })

        dispatch({
            type: "SET_PACKAGE",
            payload: packages
        })
        history.push('/seller/registration')
    }

    const handleStandard = () => {
        setPackages({
            package: pack2.name,
            totalProduct: pack2.products,
            totalDays: pack2.duration,
            price: pack2.price
        })
        dispatch({
            type: "SET_PACKAGE",
            payload: packages
        }).then(() => {
            history.push('/seller/registration')
        })
    }

    const handlePremium = () => {
        setPackages({
            package: pack3.name,
            totalProduct: pack3.products,
            totalDays: pack3.duration,
            price: pack3.price
        })
        dispatch({
            type: "SET_PACKAGE",
            payload: packages
        }).then(() => {
            history.push('/seller/registration')
        })
    }

    const makePayment = async token => {

        return await axios.post(`http://localhost:8000/api/package/payment`, { token, packages }).then(
            response => {
                console.log("response", response)
                const { status } = response
                console.log("status", status)

            }).catch(error => {
                console.log("error", error)
            })
    }

    return (
        <div class="container content">
            <div class="row gutters">
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="plan-card plan-one">
                        <div class="pricing-header">
                            <h4 class="plan-title">{pack1.name}</h4>
                            <div class="plan-cost">₹{pack1.price}</div>
                            <div class="plan-save">{pack1.previousPrice === null ? "New" : <del className="text-muted"><p>₹{pack1.previousPrice}</p></del>}</div>
                        </div>
                        <ul class="plan-features">
                            <li>{pack1.products} Products</li>
                            <li>{pack1.duration} Days Hosting of Product</li>
                            <li>{pack1.ads ? "Advertisement" : <del>Advertisement</del>}</li>
                            <li>24/7 Tech Support</li>
                            <li>Daily Backups</li>
                        </ul>
                        <div class="plan-footer footer-first">
                            <StripeCheckout stripeKey="pk_test_51IRbfUHUA6kmXMG3HN6V0Cxs9GhieMaLr39a1e1zCSHbWJbWyawjrhg6Ak9ScFRrDCQKlPZTS13PJNSkkmTnz8Of00cMto6JAg" token={makePayment} name={packages.packageType} amount={packages.price * 100} currency="INR">
                                <button onClick={handleBasic} class="btn btn-first btn-lg btn-rounded">Select Basic</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="plan-card plan-one">
                        <div class="pricing-header orange">
                            <h4 class="plan-title">{pack2.name}</h4>
                            <div class="plan-cost">₹{pack2.price}</div>
                            <div class="plan-save"><del className="text-muted">{pack2.previousPrice === null ? "New" : <p>₹{pack2.previousPrice}</p>}</del></div>
                        </div>
                        <ul class="plan-features">
                            <li>{pack2.products} Products</li>
                            <li>{pack2.duration} Days Hosting of Product</li>
                            <li>{pack2.ads ? "Advertisement" : <del>Advertisement</del>}</li>
                            <li>24/7 Tech Support</li>
                            <li>Daily Backups</li>

                        </ul>
                        <div class="plan-footer footer-second">
                            <StripeCheckout stripeKey="pk_test_51IRbfUHUA6kmXMG3HN6V0Cxs9GhieMaLr39a1e1zCSHbWJbWyawjrhg6Ak9ScFRrDCQKlPZTS13PJNSkkmTnz8Of00cMto6JAg" token={makePayment} name={packages.packageType} amount={packages.price * 100} currency="INR">
                                <button onClick={handleStandard} class="btn btn-second btn-lg btn-rounded">Select Standard</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="plan-card plan-one">
                        <div class="pricing-header green">
                            <h4 class="plan-title">{pack3.name}</h4>
                            <div class="plan-cost">₹{pack3.price}</div>
                            <div class="plan-save"><del className="text-muted">{pack3.previousPrice === null ? "New" : <p>₹{pack3.previousPrice}</p>}</del></div>
                        </div>
                        <ul class="plan-features">
                            <li>{pack3.products} Products</li>
                            <li>{pack3.duration} Days Hosting of Product</li>
                            <li>{pack3.ads ? "Advertisement" : <del>Advertisement</del>}</li>
                            <li>24/7 Tech Support</li>
                            <li>Daily Backups</li>

                        </ul>
                        <div class="plan-footer footer-third">
                            <StripeCheckout stripeKey="pk_test_51IRbfUHUA6kmXMG3HN6V0Cxs9GhieMaLr39a1e1zCSHbWJbWyawjrhg6Ak9ScFRrDCQKlPZTS13PJNSkkmTnz8Of00cMto6JAg" token={makePayment} name={packages.packageType} amount={packages.price * 100} currency="INR">
                                <button onClick={handlePremium} class="btn btn-third btn-lg btn-rounded">Select Premium</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Package

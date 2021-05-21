import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckOut from './StripeCheckOut'
import '../../../stripe.css'

const key = 'pk_test_51IRbfUHUA6kmXMG3HN6V0Cxs9GhieMaLr39a1e1zCSHbWJbWyawjrhg6Ak9ScFRrDCQKlPZTS13PJNSkkmTnz8Of00cMto6JAg'
const promise = loadStripe(key)

const OrderPayment = () => {
    return (
        <div>
            <Elements stripe={promise}>
                <div>
                    <StripeCheckOut />
                </div>
            </Elements>
        </div>
    )
}

export default OrderPayment

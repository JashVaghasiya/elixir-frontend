import easyinvoice from 'easyinvoice'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase'
import { createOrder } from '../../../functions/order';
import { sendOrderInvoice } from '../../../functions/email';
// import logo from '../../../images/elixirLogo.png'

const CreateInvoice = ({ transactionId, history, setProcessingOrder, setCreated }) => {


    const user = useSelector(state => state.user)
    const date = new Date().toDateString()
    // eslint-disable-next-line no-unused-vars
    const [product, setProduct] = useState([])
    const cart = useSelector(state => state.order.cart)
    const discount = useSelector(state => state.order.discount)
    const shippingCharges = useSelector(state => state.order.shippingCharges)
    const discountedAmount = useSelector(state => state.order.discountedAmount)
    const taxAmount = useSelector(state => state.order.taxAmount)
    const qty = useSelector(state => state.order.qty)
    const couponId = useSelector(state => state.order.couponId)
    const payableAmount = useSelector(state => state.order.payableAmount)
    const address = useSelector(state => state.order.address)
    const [upload, setUpload] = useState(false)
    const storage = firebase.storage().ref()
    const convert = () => {
        product.length = 0
        cart.forEach(c => {
            product.push({
                "quantity": c.qty,
                "description": c.productId.name,
                "tax": 12,
                "price": c.productId.price
            })
        })
        product.push({
            "quantity": 1,
            "description": "Shipping Charges",
            "tax": 0,
            "price": shippingCharges
        })
        product.push({
            "quantity": 1,
            "description": "Discounted Amount",
            "tax": 0,
            "price": -discountedAmount
        })
    }

    var data = {
        "currency": "INR",
        "taxNotation": "gst",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": 'https://firebasestorage.googleapis.com/v0/b/elixir-fbae4.appspot.com/o/elixirLogoDark.png?alt=media&token=0f8c8e1c-9487-4663-9772-82d940858681',
        "logoExtension": "png",
        "sender": {
            "company": "Elixir Pharmacy",
            "address": "Elixir Pharmacy and Warehouse, Near Noida Golf Course",
            "zip": " Sector-38, 201303",
            "city": "Delhi NCR",
            "country": "India"
        },
        "client": {
            "company": user.name,
            "address": address,
            "zip": "India",
            "city": "",
            "country": ""
        },
        "invoiceNumber": transactionId,
        "invoiceDate": date,
        "products": product,
        "bottomNotice": `You got ${discount}% discount and Saving ${discountedAmount}₹`
    };
    convert()

    !upload && transactionId && easyinvoice.createInvoice(data, function (result) {
        setUpload(true)
        setCreated(true)
        setProcessingOrder(true)
        const pdf = storage.child(`invoices/${transactionId}.pdf`)
        const uploadPaf = pdf.putString(result.pdf, 'base64')

        uploadPaf.on('state_changed', snap => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            console.log(percentUploaded)
        }, err => {
            console.error(err)
        }, () => {
            uploadPaf.snapshot.ref.getDownloadURL().then((downloadURL) => {
                createOrder(cart, qty, discountedAmount, taxAmount, shippingCharges, payableAmount, couponId, address, user._id, user.token, transactionId, downloadURL).then(res => {
                    console.log("Order created")
                    setProcessingOrder(false)
                    if (res) {
                        sendOrderInvoice(user && user.name, user && user.email, downloadURL)
                        history.push(`/user/${res.data._id}/success`)
                    }
                }).catch(error => {
                    console.log('error while creating order', error)
                })

            });
        })
    });

    return (
        <>
        </>
    )
}

export default CreateInvoice
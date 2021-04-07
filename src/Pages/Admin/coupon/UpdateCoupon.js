import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert, Col, Row } from 'react-bootstrap'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getCoupon, updateCoupon } from '../../../functions/coupon'
import '../../../main.css'
import { inputField } from '../../../main'

const UpdateCoupon = ({ history, match }) => {

    const [name, setName] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [time, setTime] = useState(null)
    const [error, setError] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        inputField()
        loadAll()
    }, [])

    const loadAll = async () => {
        await getCoupon(match.params.id, user && user.token).then(res => {
            console.log(res.data)
            setName(res.data.name)
            setDiscount(res.data.discount)
            setTime(res.data.expiresAt)
        }).catch(err => {
            console.log(err);
        })
    }

    const submitHandler = () => {


        if (name !== null && discount !== null && time !== null) {
            if (name.length < 10) {
                if (discount < 80) {
                    if (time < 366) {
                        updateCoupon(match.params.id, name, discount, time, user.token).then(res => {
                            if (res.data.coupon) {
                                history.push("/admin/coupon")
                            }
                        }).catch(error => {
                            console.log('City has not been Updated!', error)
                        })
                    } else {
                        setError('You can\'t set expiry time more than "365" days!')
                        document.getElementById("txtTime").focus()
                    }
                } else {
                    setError("You can't give more than 80% discount!")
                    document.getElementById("txtDiscount").focus()
                }
            } else {
                setError("Coupon name is too long!")
                document.getElementById("txtName").focus()
            }
        } else {
            if (name === null) {
                document.getElementById("txtName").focus()
            } else if (discount === null) {
                document.getElementById("txtDiscount").focus()
            } else {
                document.getElementById("txtTime").focus()
            }
            setError("Enter name, discount or expiry time!")
        }
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="coupon" />
                <main>
                    <div className="main__container">
                        <h3>Coupon</h3>
                        <div class="content">
                            <Row md="2" xl="3">
                                <Col>

                                    <div class="form">
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Coupon Name</h5>
                                                <input class="input-tag" maxlength="15" id="txtName" value={name} disabled onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Coupon Discount in %</h5>
                                                <input class="input-tag" maxlength="2" id="txtDiscount" value={discount} onChange={e => setDiscount(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Coupon Expiry Date in Days</h5>
                                                <input class="input-tag" min="0" maxlength="3" id="txtTime" value={time} onChange={e => setTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={(e) => submitHandler(e)} class="btn-main" value="Update Coupon" />
                                    </div>
                                    {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UpdateCoupon

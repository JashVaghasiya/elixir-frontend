import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input } from 'antd'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import AdminSideNav from '../../../components/nav/AdminSideNav'
import { getCoupon, updateCoupon } from '../../../functions/coupon'


const UpdateCoupon = ({ history, match }) => {

    const [name, setName] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [time, setTime] = useState(null)
    const [error, setError] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <Container fluid className="mt-2">
                    <Row md="4">
                        <Col className="float-left">
                            <h2>Update Coupon</h2>
                            <Input className="mt-2" maxlength="15" id="txtName" value={name} disabled onChange={e => setName(e.target.value)} placeholder="Enter Coupon Name" />
                            <Input className="mt-2" maxlength="2" id="txtDiscount" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="Enter Coupon Discount in %" />
                            <Input className="mt-2" maxlength="3" id="txtTime" value={time} onChange={e => setTime(e.target.value)} placeholder="Enter Coupon Expiry Date in Days" />
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Update Coupon</Button>
                            {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default UpdateCoupon

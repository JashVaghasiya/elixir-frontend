import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/AdminSideNav'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { createCoupon, getCoupons, deleteCoupon } from '../../../functions/coupon'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Coupon = () => {

    const [name, setName] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [coupon, setCoupon] = useState([])
    const [time, setTime] = useState(null)
    const [error, setError] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCoupon()
    }, [user])

    const loadCoupon = async () => {
        await getCoupons(user && user.token).then(res => {
            setCoupon(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const submitHandler = () => {
        setError(null)

        if (name !== null && discount !== null && time !== null) {

            const find = coupon.find(c => c.name === name.toUpperCase())
            console.log(find)

            if (find) {
                setError("Coupon name is already exist!")
            } else {

                if (name.length < 10) {
                    if (discount < 80) {
                        if (time < 365) {
                            createCoupon(name, discount, time, user.token).then(res => {
                                console.log('coupon has been created')
                                loadCoupon()

                            }).catch(error => {
                                console.log('coupon has not been created.', error)
                            })
                            setName(null)
                            setDiscount(null)
                            setTime(null)
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

    const deleteHandler = (id) => {
        deleteCoupon(id, user.token).then(res => {
            console.log('coupon has been deleted')
            loadCoupon()
        }).catch(error => {
            console.log('coupon has not been deleted.', error)
        })
    }


    return (
        <div>
            <AdminSideNav />
            <div className="page-content">
                <Container fluid className="mt-2">
                    <Row md="4">
                        <Col className="float-left">
                            <h2>Coupon</h2>
                            <Input className="mt-2" maxlength="15" type="text" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Coupon Name" />
                            <Input className="mt-2" maxlength="2" type="number" id="txtDiscount" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="Enter Coupon Discount in %" />
                            <Input className="mt-2" maxlength="3" type="number" id="txtTime" value={time} onChange={e => setTime(e.target.value)} placeholder="Enter Coupon Expiry Date in Days" />
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Create Coupon</Button>
                            {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row className="mt-2">
                        {coupon.map((c) => (
                            <Col key={c._id} md="3">
                                <div>
                                    <Alert variant="dark">{c.name}
                                        <span className="float-right text-center">
                                            <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/coupon/${c._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                            <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteHandler(c._id)} /></Tooltip>
                                        </span>
                                    </Alert>
                                </div>
                            </Col>
                        ))}
                    </Row>

                </Container>
            </div>
        </div>
    )
}

export default Coupon

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import { Alert, Col, Row } from 'react-bootstrap'
import { createCoupon, getCoupons, deleteCoupon } from '../../../functions/coupon'
import { Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../../main.css'
import { inputField } from '../../../main'

const Coupon = () => {

    const [name, setName] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [coupon, setCoupon] = useState([])
    const [time, setTime] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        const loadCoupon = async () => {
            setLoading(true)
            await getCoupons(user && user.token).then(res => {
                setLoading(false)
                setCoupon(res.data)
            }).catch(error => {
                console.log(error);
            })
            inputField()
        }
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
                            setError('You can\'t set expiry time more than "365" or "0" days!')
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
        setTimeout(() => {
            setError(null)
        }, 5000)
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
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="coupon" />
                <main>
                    <div className="main__container">
                        <h3>Coupon</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <>
                                <div class="content">
                                    <Row md="2" xl="3">
                                        <Col>

                                            <div class="form">
                                                <div class="input-div">
                                                    <div>
                                                        <h5>Enter Coupon Name</h5>
                                                        <input class="input-tag" maxlength="10" type="text" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="input-div">
                                                    <div>
                                                        <h5>Enter Coupon Discount in %</h5>
                                                        <input class="input-tag" min="0" maxlength="2" type="number" id="txtDiscount" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="" />
                                                    </div>
                                                </div>
                                                <div class="input-div">
                                                    <div>
                                                        <h5>Enter Coupon Expiry Date in Days</h5>
                                                        <input class="input-tag" min="0" maxlength="3" type="number" id="txtTime" value={time} onChange={e => setTime(e.target.value)} placeholder="" />
                                                    </div>
                                                </div>
                                                <input onClick={(e) => submitHandler(e)} class="btn-main" value="Create Coupon" />
                                            </div>

                                            {error !== null ? <Alert className="mt-2" variant="dark" style={{ color: "red" }}>{error}</Alert> : ''}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="white2"></div>
                                <Row className="mt-3">
                                    {coupon.map((c) => (
                                        <Col key={c._id} md="6" xl="4" sm="6">
                                            <div>
                                                <Alert variant="dark" style={{ color: "#fff" }}>{c.name + " - " + c.discount + "% - " + c.expiresAt + " days"}
                                                    <span className="float-right text-center">
                                                        <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/coupon/${c.name}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                        <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteHandler(c._id)} /></Tooltip>
                                                    </span>
                                                </Alert>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Coupon

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getPackage, updatePackage } from '../../../functions/package'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import '../../../main.css'
import { inputField } from '../../../main'

const UpdatePackage = ({ match, history }) => {

    const user = useSelector(state => state.user)
    const [packs, setPacks] = useState([])
    const [name, setName] = useState(null)
    const [duration, setDuration] = useState(null)
    const [ads, setAds] = useState(false)
    const [products, setProducts] = useState(null)
    const [price, setPrice] = useState(null)
    const [previousPrice, setPreviousPrice] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getPacks()
        inputField()
    }, [])

    const getPacks = async () => {

        await getPackage(match.params.id, user && user.token).then(res => {
            setName(res.data.name)
            setDuration(res.data.duration)
            setPreviousPrice(res.data.price)
            setProducts(res.data.products)
            setAds(res.data.ads)
            setPrice(res.data.price)
        }).catch(err => {
            console.log(err)
        })
    }

    const submitHandler = (e) => {

        e.preventDefault()
        if (name !== null && name.length < 10) {
            if (duration !== null) {
                if (products !== null) {
                    updatePackage(match.params.id, { name, previousPrice, duration, ads, products, price }, user.token).then(res => {

                        history.push('/admin/package')
                    }).catch(error => {
                        console.log('coupon has not been created.', error)
                    })
                } else {
                    setError("Fill Total Products!")
                    document.getElementById('txtProduct').focus()
                }
            } else {
                setError("Fill Duration of Package!")
                document.getElementById('txtDuration').focus()
            }
        } else {
            setError("Fill Name of Package Properly!")
            document.getElementById('txtName').focus()
        }

    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="package" />
                <main>
                    <div className="main__container">
                        <h3>Package</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>
                                <div className="content">
                                    <div class="form">
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Package Name</h5>
                                                <input type="text" class="input-tag" maxlength="10" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Package Duration in Days</h5>
                                                <input type="text" class="input-tag" maxlength="3" id="txtDuration" value={duration} onChange={e => setDuration(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Package Product</h5>
                                                <input type="text" class="input-tag" maxlength="2" id="txtProduct" value={products} onChange={e => setProducts(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Package Price</h5>
                                                <input type="text" class="input-tag" maxlength="5" id="txtPrice" value={price} onChange={e => setPrice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="">
                                            <div>
                                                <Checkbox checked={ads} onChange={e => setAds(e.target.checked)}></Checkbox>
                                                <h5>Seller can Make Ads of Product</h5>
                                            </div>
                                        </div>
                                        <input onClick={(e) => submitHandler(e)} class="btn-main" value="Update Package" />
                                    </div>
                                </div>
                                {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                        </Row>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default UpdatePackage

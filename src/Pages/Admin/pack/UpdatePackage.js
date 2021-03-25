import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/AdminSideNav'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { } from '../../../functions/coupon'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getPackage, updatePackage } from '../../../functions/package'
import Checkbox from 'antd/lib/checkbox/Checkbox'

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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <Container fluid className="mt-2">
                    <Row md="4">
                        <Col className="float-left">
                            <h2>Package</h2>
                            <Input className="mt-2" maxlength="10" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Package Name" />
                            <Input className="mt-2" maxlength="3" id="txtDuration" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Enter Package Duration in Days" />
                            <Input className="mt-2" maxlength="2" id="txtProduct" value={products} onChange={e => setProducts(e.target.value)} placeholder="Enter Number Products" />
                            <Input className="mt-2" maxlength="5" id="txtPrice" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Package Price" />
                            <Checkbox className="mt-2" checked={ads} onChange={e => setAds(e.target.checked)}>Seller can Make Ads of Product</Checkbox>
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Update Package</Button>
                            {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default UpdatePackage

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getPackages } from '../../../functions/package'
// import Checkbox from 'antd/lib/checkbox/Checkbox'

const CreatePackage = () => {

    const user = useSelector(state => state.user)
    const [packs, setPacks] = useState([])
    // const [name, setName] = useState('')
    // const [duration, setDuration] = useState()
    // const [ads, setAds] = useState(false)
    // const [product, setProduct] = useState()
    // const [price, setPrice] = useState()

    useEffect(() => {
        getPacks()
    }, [])

    const getPacks = async () => {
        await getPackages().then(res => {
            console.log(res.data);
            setPacks(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // const submitHandler = (e) => {

    //     e.preventDefault()
    //     createPackage({ name, duration, ads, product, price }, user.token).then(res => {
    //         getPacks()
    //     }).catch(error => {
    //         console.log('coupon has not been created.', error)
    //     })
    // }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="package" />
                <main>
                    <div className="container-fluid">
                        <Container fluid className="mt-2">
                            <Row md="4">
                                <Col className="float-left">
                                    <h2>Package</h2>
                                    {/* <Input className="mt-2" name="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Package Name" />
                            <Input className="mt-2" name="txtDuration" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Enter Package Duration in Days" />
                            <Input className="mt-2" name="txtProduct" value={product} onChange={e => setProduct(e.target.value)} placeholder="Enter Number Products" />
                            <Input className="mt-2" name="txtPrice" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Package Price" />
                            <Checkbox className="mt-2" onChange={e => setAds(e.target.checked)}>Seller can Make Ads of Product</Checkbox>
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Create Package</Button> */}
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row className="mt-2">
                                {packs.map((p) => (
                                    <Col key={p._id} md="3">
                                        <div>
                                            <Alert variant="dark">{p.name}
                                                <span className="float-right text-center">
                                                    <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/package/${p._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                </span>
                                            </Alert>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                        </Container>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreatePackage

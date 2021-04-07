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
                    <div className="main__container">
                        <h3>Package</h3>
                        <div className="white2"></div>
                        <Row className="mt-3">
                            {packs.map((p) => (
                                <Col key={p._id} md="6" xl="4" sm="6">
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
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreatePackage

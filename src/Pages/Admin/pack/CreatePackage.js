import React, { useState, useEffect } from 'react'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { Alert, Col, Row } from 'react-bootstrap'
import { Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getPackages } from '../../../functions/package'
import Loader from '../../../components/Loader'


const CreatePackage = () => {

    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPacks()
    }, [])

    const getPacks = async () => {
        setLoading(true)
        await getPackages().then(res => {
            setLoading(false)
            setPacks(res.data)
        }).catch(err => {
            console.log(err)
        })
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
                        {loading ? <Loader color="white" /> :
                            <Row className="mt-3">
                                {packs && packs.length > 0 && packs.map((p) => (
                                    <Col key={p._id} md="6" xl="4" sm="6">
                                        <div>
                                            <Alert variant="dark" style={{ color: "#fff" }}>{p.name}
                                                <span className="float-right text-center">
                                                    <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/package/${p._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                </span>
                                            </Alert>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreatePackage

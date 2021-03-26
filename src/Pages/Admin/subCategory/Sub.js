import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Select, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { getCategories } from '../../../functions/category'
import { Link } from 'react-router-dom'
import { createSub, deleteSub, getSubs } from '../../../functions/subCategory'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const Sub = () => {

    const [name, setName] = useState(null)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [subs, setSubs] = useState([])
    const user = useSelector(state => state.user)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAll()
    }, [])

    const loadAll = async () => {
        await getCategories().then(res => {
            setCategories(res.data)
        }).catch(error => {
            console.log(error);
        })
        setLoading(true)
        await getSubs().then(res => {

            setSubs(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    const submitHandler = (e) => {

        e.preventDefault()
        if (category !== null && name !== null) {
            if (name.length < 25) {
                createSub(category, name, user.token).then(res => {
                    if (res.data.subError) {
                        setError(res.data.subError)
                    } else {
                        subs.push(res.data)
                        loadAll()
                    }
                }).catch(error => {
                    console.log('Sub has not been created.', error)
                })
            } else {
                setError("Sub Name is too long!")
                document.getElementById('txtName').focus()
            }

        } else {
            setError("Select Category or Enter Sub Name!")
            document.getElementById('txtName').focus()
        }

    }

    const deleteSubs = async (id) => {

        await deleteSub(id, user.token).then(res => {
            loadAll()
            setName("")
        }).catch(error => {
            console.log('Delete Sub Error:', error)
        })
    }

    return (
        <div>
            <AdminSideNav />
            <div className="page-content">
                <Container fluid className="mt-2">
                    <Row md="3">
                        <Col className="float-left">
                            <h2>Sub Category</h2>
                            <Select style={{ width: "100%" }} className="mt-2" onChange={(value) => setCategory(value)} defaultValue="Select Category">
                                {
                                    categories.map(c => (
                                        <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                                    ))
                                }
                            </Select>
                            <Input className="mt-2" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Sub Category" />
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Insert</Button>
                            {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        {loading ? "Loading..." : subs.map((s) => (
                            <Col key={s._id} md="3">
                                <Alert variant="dark">{s.name}
                                    <span className="float-right text-center">
                                        <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/sub/${s._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                        <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteSubs(s._id)} /></Tooltip>
                                    </span>
                                </Alert>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Sub

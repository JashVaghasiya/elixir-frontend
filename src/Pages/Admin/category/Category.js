import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { createCategory, deleteCategory, getCategories } from '../../../functions/category'
import { Link } from 'react-router-dom'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Chart from '../Chart/Chart'

const Category = () => {

    const [name, setName] = useState(null)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        setLoading(true)
        await getCategories().then(res => {
            setCategories(res.data)
            setLoading(false)
        }).catch(error => {
            console.log(error);
        })
    }

    const submitHandler = (e) => {
        setError(null)
        e.preventDefault()
        if (name !== null) {
            if (name.length < 25) {
                createCategory(name, user && user.token).then(res => {
                    if (res.data.categoryError) {
                        setError(res.data.categoryError)
                    } else {
                        categories.push(res.data)

                    }
                    loadCategories()
                }).catch(error => {
                    console.log('category has not been created.', error)
                })
            } else {
                setError("Category name is too Long!")
            }

        } else {
            setError("Fill the Category")
            document.getElementById("txtName").focus()
        }

    }

    const deleteCategories = async (id) => {

        await deleteCategory(id, user.token).then(res => {
            loadCategories()
            setName("")
        }).catch(error => {
            console.log('Delete Category Error:', error)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="category" />
                <main>
                    <Container fluid className="mt-2">
                        <Row md="4">
                            <Col>
                                <h2>Category</h2>
                                <Input className="mt-2" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Category" />
                                <Button className="mt-2" onClick={submitHandler} type="primary" block>Insert</Button>
                                {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row className="mt-2">
                            {loading ? "Loading..." : categories.map((c) => (
                                <Col key={c._id} md="3">
                                    <div>
                                        <Alert variant="dark">{c.name}
                                            <span className="float-right text-center">
                                                <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/category/${c._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteCategories(c._id)} /></Tooltip>
                                            </span>
                                        </Alert>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                    </Container>
                </main>
            </div>
        </div>
    )
}

export default Category

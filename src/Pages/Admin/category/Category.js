import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Row } from 'react-bootstrap'
import { createCategory, deleteCategory, getCategories } from '../../../functions/category'
import { Link } from 'react-router-dom'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import '../../../main.css'
import { inputField } from '../../../main'
import Loader from '../../../components/Loader'

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
        inputField()
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
                        loadCategories()
                    }
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
        setTimeout(() => {
            setError(null)
        }, 5000)
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
                    <div className="main__container">
                        <h3>Category</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <>
                                <Row md={2} xl={3}>
                                    <Col>
                                        <div class="content">
                                            <div class="form">
                                                <div class="input-div">
                                                    <div>
                                                        <h5>Enter Category Name</h5>
                                                        <input type="text" className="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <button onClick={(e) => submitHandler(e)} class="btn-main" >Create Category</button>
                                                {error !== null && <Alert variant="dark" className="mt-2 text-white">{error}!</Alert>}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="white2"></div>
                                <Row className="mt-4">
                                    {categories && categories.length > 0 && categories.map((c) => (
                                        <Col key={c._id} md="6" xl="4" sm="6">
                                            <div>
                                                <Alert variant="dark" className="text-white">{c.name}
                                                    <span className="float-right text-center">
                                                        <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/category/${c._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                        <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteCategories(c._id)} /></Tooltip>
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

export default Category

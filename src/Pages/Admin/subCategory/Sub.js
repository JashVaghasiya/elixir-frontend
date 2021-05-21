import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Row } from 'react-bootstrap'
import { getCategories } from '../../../functions/category'
import { Link } from 'react-router-dom'
import { createSub, deleteSub, getSubs } from '../../../functions/subCategory'
import AdminSideNav from '../../../components/nav/Admin'
import Loader from '../../../components/Loader'
import Header from '../../../components/nav/HeaderMain'
import '../../../main.css'
import { inputField } from '../../../main'

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
        inputField()
    }

    const submitHandler = (e) => {

        e.preventDefault()
        if (category !== null && name !== null) {
            if (name.length < 25) {
                console.log(category, name);
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
        setTimeout(() => {
            setError(null)
        }, 5000)
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
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="sub" />
                <main>
                    <div className="main__container">
                        <h3>Sub-Category</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <>
                                <Row md={2} xl={3}>
                                    <Col>
                                        <div class="content">
                                            <div class="form">
                                                <div class="input-div focus">
                                                    <div>
                                                        <h5>Select Category</h5>
                                                        <select class="input-tag" onChange={(e) => setCategory(e.target.value)} defaultValue="Select Category">
                                                            <option>Select Category</option>
                                                            {
                                                                categories.map(c => (
                                                                    <option key={c._id} value={c._id}>{c.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="input-div">
                                                    <div>
                                                        <h5>Enter SubCategory Name</h5>
                                                        <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <input onClick={(e) => submitHandler(e)} class="btn-main" value="Create Sub-Category" />
                                                {error !== null && <Alert className="mt-2" variant="dark">{error}</Alert>}
                                            </div>
                                        </div>


                                    </Col>
                                </Row>
                                <div className="white2 mb-2"></div>
                                <Row>
                                    {subs && subs.length > 0 && subs.map((s) => (
                                        <Col key={s._id} md="6" xl="4" sm="6">
                                            <Alert variant="dark" style={{ color: "white" }}>{s.name}
                                                <span className="float-right text-center">
                                                    <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/sub/${s._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                    <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteSubs(s._id)} /></Tooltip>
                                                </span>
                                            </Alert>
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

export default Sub

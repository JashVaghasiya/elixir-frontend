import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input } from 'antd'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { getCategories } from '../../../functions/category'
import { getSub, updateSub } from '../../../functions/subCategory'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import '../../../main.css'
import { inputField } from '../../../main'

const UpdateSub = ({ history, match }) => {

    const [name, setName] = useState(null)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [error, setError] = useState(null)
    const [oldSub, setOldSub] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        inputField()
        loadAll()
    }, [])

    const loadAll = async () => {
        await getCategories().then(res => {
            setCategories(res.data)
        }).catch(error => {
            console.log(error);
        })
        await getSub(match.params.id, user.token).then(res => {
            setName(res.data.name)
            setCategory(res.data.category)
            setOldSub(res.data.name)
        }).catch(err => {
            console.log(err);
        })
    }

    const submitHandler = (e) => {

        e.preventDefault()
        if (category !== null && name !== null) {
            if (oldSub === name) {
                history.push("/admin/sub")
            } else {
                updateSub(match.params.id, category, name, user.token).then(res => {
                    if (res.data.sub) {
                        history.push("/admin/sub")
                    }
                }).catch(error => {
                    console.log('Sub has not been created.', error)
                })
            }
        } else {
            setError("Select Category or Enter Sub Name!")
            document.getElementById('txtName').focus()
        }
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
                        <Row md="2" xl="3">
                            <Col>
                                <div class="content">
                                    <div class="form">
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Select Category</h5>
                                                <select className="input-tag" onChange={(e) => setCategory(e.target.value)} defaultValue="Select Category">
                                                    {
                                                        categories.map(c => (
                                                            <option key={c._id} selected={c._id === category} value={c._id}>{c.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter SubCategory Name</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={(e) => submitHandler(e)} class="btn-main" value="Update Sub-Category" />
                                    </div>
                                </div>
                                {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UpdateSub

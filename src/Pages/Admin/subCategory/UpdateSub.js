import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input } from 'antd'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { getCategories } from '../../../functions/category'
import { getSub, updateSub } from '../../../functions/subCategory'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const UpdateSub = ({ history, match }) => {

    const [name, setName] = useState(null)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [error, setError] = useState(null)
    const [oldSub, setOldSub] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <Container fluid className="mt-2">
                    <Row md="4">
                        <Col className="float-left">
                            <h2>Sub Category</h2>
                            <select style={{ width: "100%" }} className="form-control" onChange={(e) => setCategory(e.target.value)}>
                                {
                                    categories.map(c => (
                                        <option key={c._id} selected={c._id === category} value={c._id}>{c.name}</option>
                                    ))
                                }
                            </select>
                            <Input className="mt-2" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Sub Category" />
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Update</Button>
                            {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default UpdateSub

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Select, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { getStates } from '../../../functions/state'
import { Link } from 'react-router-dom'
import { createCity, deleteCity, getCities } from '../../../functions/city'
import AdminSideNav from '../../../components/nav/AdminSideNav'

const City = () => {

    const [name, setName] = useState(null)
    const [states, setStates] = useState([])
    const [state, setState] = useState(null)
    const [cities, setCities] = useState([])
    const [error, setError] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        loadAll()
    }, [])

    const loadAll = async () => {
        await getCities().then(res => {
            setCities(res.data)
        }).catch(err => {
            console.log(err);
        })
        await getStates().then(res => {
            setStates(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const submitHandler = (e) => {
        setError(null)
        if (state !== null) {
            if (name !== null && name.length < 30) {
                createCity(state, name, user.token).then(res => {
                    console.log(res)
                    if (res.data.cityError) {
                        setError(res.data.cityError)
                    } else {
                        cities.push(res.data)
                        loadAll()
                        setName(null)

                    }
                }).catch(error => {
                    console.log('City has not been created.', error)
                })

            } else {
                setError("Fill the City Name properly!")
                document.getElementById("txtName").focus()
            }
        } else {
            setError("Select State!")
            document.getElementById("txtState").focus()

        }
    }

    const deleteCities = async (id) => {

        await deleteCity(id, user.token).then(res => {
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
                            <h2>City</h2>
                            <Select id="txtState" className="mt-2" onChange={(value) => setState(value)} defaultValue="Select State">
                                {
                                    states.map(c => (
                                        <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                                    ))
                                }
                            </Select>
                            <Input className="mt-2" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter City Name" />
                            <Button className="mt-2" onClick={submitHandler} type="primary" block>Insert</Button>
                            {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row className="mt-2">
                        {cities.map((s) => (
                            <Col key={s._id} md="3" className="m-2">
                                <div>
                                    <Alert variant="dark">{s.city}
                                        <span className="float-right text-center">
                                            <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/city/${s._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                            <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteCities(s._id)} /></Tooltip>
                                        </span>
                                    </Alert>
                                </div>
                            </Col>
                        ))}
                    </Row>

                </Container>
            </div>
        </div>
    )
}

export default City

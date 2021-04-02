import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert, Button, Input } from 'antd'
import { Col, Container, Row } from 'react-bootstrap'
import { getCity, updateCity } from '../../../functions/city'
import AdminSideNav from '../../../components/nav/AdminSideNav'
import Header from '../../../components/nav/HeaderMain'
import { getStates } from '../../../functions/state'


const UpdateCity = ({ history, match }) => {

    const [name, setName] = useState(null)
    const [states, setStates] = useState([])
    const [state, setState] = useState(null)
    const [oldCity, setOldCity] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadAll()
    }, [])

    const loadAll = async () => {
        await getCity(match.params.id, user.token).then(res => {
            setName(res.data.city)
            setState(res.data.state)
            setOldCity(res.data.city)
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
        e.preventDefault()
        if (name !== null && state !== null && name.length < 30) {
            if (oldCity === name) {
                history.push("/admin/cities")
            } else {
                updateCity(match.params.id, state, name, user.token).then(res => {
                    if (res.data.city) {
                        history.push("/admin/cities")
                    }
                }).catch(error => {
                    console.log('City has not been Updated.', error)
                })

            }

        } else {
            setError("Select State or Enter City Name!")
            document.getElementById("txtName").focus()
        }
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="city" />
                <main>
                    <div className="container-fluid">
                        <Container fluid className="mt-2">
                            <Row md="4">
                                <Col className="float-left">
                                    <h2>Update City</h2>
                                    <select style={{ width: "100%" }} className="form-control" onChange={(e) => setState(e.target.value)}>
                                        {
                                            states.map(c => (
                                                <option key={c._id} selected={c._id === state} value={c._id}>{c.name}</option>
                                            ))
                                        }
                                    </select>
                                    <Input className="mt-2" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter City" />

                                    <Button className="mt-2" onClick={submitHandler} type="primary" block>Update City</Button>
                                    {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UpdateCity

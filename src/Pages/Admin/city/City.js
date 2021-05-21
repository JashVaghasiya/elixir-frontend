import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Row } from 'react-bootstrap'
import { getStates } from '../../../functions/state'
import { Link } from 'react-router-dom'
import { createCity, deleteCity, getCities } from '../../../functions/city'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import { inputField } from '../../../main'


const City = () => {

    const [name, setName] = useState(null)
    const [states, setStates] = useState([])
    const [state, setState] = useState(null)
    const [cities, setCities] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {

        loadAll()
    }, [])

    const loadAll = async () => {
        setLoading(true)
        await getCities().then(res => {

            setCities(res.data)
        }).catch(err => {
            console.log(err);
        })
        await getStates().then(res => {
            setLoading(false)
            setStates(res.data)
        }).catch(error => {
            console.log(error);
        })
        inputField()
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
        setTimeout(() => {
            setError(null)
        }, 5000)
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
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="city" />
                <main>
                    <div className="main__container">
                        <h3>City</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <>
                                <Row md="2" xl="3">
                                    <Col>
                                        <div class="content">
                                            <div class="form">
                                                <div class="input-div focus">
                                                    <div>
                                                        <h5>Select State</h5>
                                                        <select id="txtState" className="input-tag focus" onChange={(e) => setState(e.target.value)} defaultValue="Select State">
                                                            <option value="">Select State</option>
                                                            {
                                                                states.map(c => (
                                                                    <option key={c._id} value={c._id}>{c.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="input-div">
                                                    <div>
                                                        <h5>Enter City Name</h5>
                                                        <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <button onClick={() => submitHandler()} class="btn-main" >Create City</button>
                                                {error !== null ? <Alert className="mt-2" variant="dark" style={{ color: "red" }}>{error}</Alert> : ''}
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                                <div className="white2"></div>

                                <Row className="mt-4">
                                    {cities && cities.length > 0 && cities.map((s) => (
                                        <Col key={s._id} md="6" xl="4" sm="6">
                                            <div>
                                                <Alert variant="dark" style={{ color: "#fff" }}>{s.city}
                                                    <span className="float-right text-center">
                                                        <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/city/${s._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                        <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteCities(s._id)} /></Tooltip>
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

export default City

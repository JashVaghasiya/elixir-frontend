import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { createState, deleteState, getStates } from '../../../functions/state'
import { inputField } from '../../../main'

const State = () => {
    const [name, setName] = useState(null)
    const [states, setStates] = useState([])
    const [error, setError] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        inputField()
        loadStates()
    }, [])

    const loadStates = async () => {
        await getStates().then(res => {
            setStates(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const submitHandler = (e) => {
        setError(null)
        if (name !== null && name.length < 25) {
            const find = states && states.find(s => s.name === name)
            if (find) {
                setError("State is already exist!")
            } else {
                createState(name, user.token).then(res => {
                    console.log('State has been created')
                    setStates(res.data)
                    loadStates()
                }).catch(error => {
                    console.log('State has not been created.', error)
                })
            }
        } else {
            setError("Fill the state name properly!")
            document.getElementById("txtName").focus()
        }
    }

    const deleteStates = async (id) => {

        await deleteState(id, user.token).then(res => {
            loadStates()
            setName("")
        }).catch(error => {
            console.log('Delete State Error:', error)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="state" />
                <main>
                    <div className="main__container">
                        <h3>States</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>
                                <div class="content">
                                    <div class="form">
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter State Name</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={() => submitHandler()} class="btn-main" value="Create State" />
                                    </div>
                                </div>
                                {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                            </Col>
                        </Row>
                        <div className="white2"></div>
                        <Row className="mt-3">
                            {user && states.length > 0 && states.map((c) => (
                                <Col key={c._id} md="6" xl="4" sm="6">
                                    <div>
                                        <Alert variant="dark">{c.name}
                                            <span className="float-right text-center">
                                                <Tooltip className="mr-3" title="Edit" color="green"><Link to={`/admin/state/${c._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link></Tooltip>
                                                <Tooltip title="Delete" color="red"><CloseOutlined className="text-danger" onClick={() => deleteStates(c._id)} /></Tooltip>
                                            </span>
                                        </Alert>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default State

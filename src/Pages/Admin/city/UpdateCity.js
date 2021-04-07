import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { getCity, updateCity } from '../../../functions/city'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getStates } from '../../../functions/state'
import { inputField } from '../../../main'


const UpdateCity = ({ history, match }) => {

    const [name, setName] = useState(null)
    const [states, setStates] = useState([])
    const [state, setState] = useState(null)
    const [oldCity, setOldCity] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        inputField()
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
                    <div className="main__container">
                        <h3>Update City</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>
                                <div class="content">
                                    <div class="form">
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Select State</h5>
                                                <select className="input-tag" onChange={(e) => setState(e.target.value)}>
                                                    {
                                                        states.map(c => (
                                                            <option key={c._id} selected={c._id === state} value={c._id}>{c.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter City Name</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={(e) => submitHandler(e)} class="btn-main" value="Update City" />
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

export default UpdateCity

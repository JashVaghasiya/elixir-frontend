import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getState, updateState } from '../../../functions/state'
import { inputField } from '../../../main'

const UpdateState = ({ history, match }) => {
    const [name, setName] = useState(null)
    const [oldName, setOldName] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        inputField()
        loadState()
    }, [])

    const loadState = async () => {
        await getState(match.params.id, user.token).then(res => {
            setName(res.data.name)
            setOldName(res.data.name)
        }).catch(err => {
            console.log("Get State Error", err)
        })
    }

    const submitHandler = async (id) => {
        if (name === oldName) {
            history.push("/admin/states")
        } else {
            if (name !== null) {
                await updateState(id, name, user.token).then(res => {
                    if (res.data.stateError) {
                        setError(res.data.stateError)
                    } else {
                        history.push("/admin/states")
                    }
                }).catch(error => {
                    console.log('Update State Error:', error)
                })
            } else {
                setError("Fill the State name properly!")
                document.getElementById("txtName").focus()
            }
        }
    }

    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="state" />
                <main>
                    <div className="main__container">
                        <h3>Update State</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>
                                <div class="content">
                                    <div class="form">
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Category Name</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={() => submitHandler(match.params.id)} class="btn-main" value="Update Category" />
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

export default UpdateState

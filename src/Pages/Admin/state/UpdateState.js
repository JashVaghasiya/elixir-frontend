import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { Alert, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/AdminSideNav'
import { getState, updateState } from '../../../functions/state'

const UpdateState = ({ history, match }) => {
    const [name, setName] = useState(null)
    const [oldName, setOldName] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
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
        <div>
            <AdminSideNav />
            <div className="page-content">
                <h3>Update State</h3>
                <Container fluid>
                    <Input className="mt-2" id="txtName" maxlength="25" value={name} onChange={e => setName(e.target.value)} placeholder="Enter State" />
                    <Button className="mt-2" name="btnLogin" onClick={() => submitHandler(match.params.id)} type="primary">Update State</Button>
                    {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                </Container>
            </div>
        </div>
    )
}

export default UpdateState

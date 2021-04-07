import React from 'react'
import Header from '../../../components/nav/HeaderMain'
import AdminSideNav from '../../../components/nav/Admin'
import { Row, Col, Alert } from 'react-bootstrap'
import { inputField } from '../../../main'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { createAgency } from '../../../functions/agency'
import { auth } from '../../../firebase/firebase'

const CreateAgency = ({ history }) => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [address, setAddress] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        inputField()
        loadCategories()
    }, [])

    const loadCategories = async () => {
        setLoading(true)
    }

    const url = window.location.href
    const submitHandler = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailLink(email, url)
            console.log(result);
            if (result.user.emailVerified) {
                let user = auth.currentUser
                await user.updatePassword(password)
                const idToken = await user.getIdTokenResult()
                await createAgency({ name, email, address, mobile }, idToken.token).then(res => {
                    setLoading(false)
                }
                ).catch(error => {
                    console.log("error in after signUp", error);
                })
            }
        } catch (error) {
            console.log('error in signUp');
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="category" />
                <main>
                    <div className="main__container">
                        <h3>Create Agency</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>
                                <div class="content">
                                    <div class="form">
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter Agency Name</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter Agency Email</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter Address</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter Mobile No.</h5>
                                                <input type="text" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="input-div">
                                            <div>
                                                <h5>Enter Password</h5>
                                                <input type="password" class="input-tag" maxlength="25" id="txtName" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={() => submitHandler()} class="btn-main" value="Create Agency" />
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

export default CreateAgency

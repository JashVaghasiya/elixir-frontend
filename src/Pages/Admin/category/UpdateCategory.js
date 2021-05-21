import React, { useEffect, useState } from 'react'
import { Alert, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import '../../../main.css'
import { inputField } from '../../../main'


const UpdateCategory = ({ history, match }) => {

    const [name, setName] = useState()
    const user = useSelector(state => state.user)
    const [error, setError] = useState(null)

    useEffect(() => {
        inputField()
        loadCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadCategory = async () => {
        await getCategory(match.params.id, user && user.token).then(res => {
            setName(res.data.name)
        }).catch(err => {
            console.log("Get Category Error", err)
        })
    }

    const submitHandler = async (id) => {
        if (name.length > 0) {
            if (name.length < 25) {
                await updateCategory(id, name, user.token).then(res => {
                    if (res.data.categoryError) {
                        setError(res.data.categoryError)
                    } else {
                        history.push("/admin/category")
                    }
                }).catch(error => {
                    console.log('Update Category Error:', error)
                })
            } else {
                setError("Category name is too long!")
                document.getElementById('txtName').focus()
            }

        } else {
            setError("Fill the Category")
            document.getElementById('txtName').focus()
        }
        setTimeout(() => {
            setError(null)
        }, 5000)
    }
    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="category" />
                <main>
                    <div className="main__container">
                        <h3>Category</h3>
                        <div className="white2"></div>
                        <Row md="2" xl="3">
                            <Col>

                                <div class="content">
                                    <div class="form">
                                        <div class="input-div focus">
                                            <div>
                                                <h5>Enter Category Name</h5>
                                                <input type="text" class="input-tag" id="txtName" maxlength="25" value={name} defaultValue={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <input onClick={() => submitHandler(match.params.id)} class="btn-main" value="Update Category" />
                                        {error !== null && <Alert variant="dark" className="mt-2">{error}</Alert>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UpdateCategory

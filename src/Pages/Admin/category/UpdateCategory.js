import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { Container, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import AdminSideNav from '../../../components/nav/AdminSideNav'
const UpdateCategory = ({ history, match }) => {

    const [name, setName] = useState(null)
    const user = useSelector(state => state.user)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = async () => {
        await getCategory(match.params.id, user && user.token).then(res => {
            setName(res.data.name)
        }).catch(err => {
            console.log("Get Category Error", err)
        })
    }

    const submitHandler = async (id) => {
        if (name !== null) {
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
    }
    return (
        <div>
            <AdminSideNav />
            <div className="page-content">
                <Container fluid>
                    <Input id="txtName" maxlength="25" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Category" />
                    <Button name="btnLogin" onClick={() => submitHandler(match.params.id)} type="primary">Update</Button>
                    {error !== null ? <Alert className="mt-2" variant="danger">{error}</Alert> : ''}
                </Container>
            </div>
        </div>
    )
}

export default UpdateCategory

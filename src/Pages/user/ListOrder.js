import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Container } from 'react-bootstrap'
import { getUserOrder } from '../../functions/order'
import Loader from '../../components/Loader'
const ListOrder = ({ history }) => {

    const user = useSelector(state => state.user)
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (user) {
            getOrders()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getOrders = () => {
        setLoading(true)
        getUserOrder(user && user._id, user && user.token).then(res => {
            setLoading(false)
            setOrder(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const copyID = (id) => {
        var textField = document.createElement('textarea')
        textField.innerText = id
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    const redirectToDetail = (id, status) => {
        history.push(`/user/order/${id}/${status}`)
    }
    return (

        <Container className="order-list-container mb-5" style={{ margin: "auto" }}>

            <h3 style={{ marginTop: 25 }}>Order History<i style={{ marginLeft: 10 }} class="fas fa-history"></i></h3>
            {loading ? <Loader /> :
                <ListGroup variant='flush' style={{ marginTop: "30px", textAlign: "center" }}>
                    <ListGroup.Item className="shipping-form text-center" style={{ border: "none", background: "#f7f7f9" }}>
                        <Row>

                            <Col md={3} xs={12}>
                                <h6 style={{ margin: 0, padding: 5 }} className="order-heading">Order ID</h6>
                            </Col>
                            <Col md={2} xs={12}>
                                <h6 style={{ margin: 0, padding: 5 }} className="order-heading">Total</h6>
                            </Col>
                            <Col md={3} xs={12} style={{ "fontSize": "18px" }}><h6 style={{ margin: 0, padding: 5 }} className="order-heading">Ordered At</h6></Col>
                            <Col md={2} xs={12} style={{ "fontSize": "18px" }}><h6 style={{ margin: 0, padding: 5 }} className="order-heading">Invoice</h6></Col>
                            <Col md={1} xs={12} style={{ "fontSize": "18px" }}><h6 style={{ margin: 0, padding: 5 }} className="order-heading">Make Complain</h6></Col>
                            <Col md={1} xs={12}><h6 style={{ margin: 0, padding: 5 }} className="order-heading">Copy</h6></Col>
                        </Row>

                    </ListGroup.Item>
                    {order && order.length > 0 && order.map(o => (

                        <ListGroup.Item key={o._id} className="shipping-form text-center" style={{ border: "none", borderBottom: "2px solid #f7f7f9", marginTop: "10px" }}>
                            <Row>
                                <Col md={3} xs={12} onClick={() => redirectToDetail(o._id, o.status)} >
                                    <p className="text-order">{o._id}</p>
                                </Col>

                                <Col md={2} xs={12}>
                                    <p className="text-order">₹{o.grandTotal}</p>
                                </Col>
                                <Col md={3} xs={12} style={{ "fontSize": "18px" }}><p className="text-order">{o.createdAt.substr(0, 10).concat(" ").concat(o.createdAt.substr(11, 8))}</p></Col>
                                <Col md={2} xs={12} style={{ "fontSize": "18px" }}><div className="btn btn-dark text-center"><a href={o.invoiceURL} alt={o.invoiceURL}>Download</a></div></Col>
                                <Col md={1} xs={12} style={{ "fontSize": "18px" }}><p className="text-order"><div className="btn btn-dark text-center"><Link to={`/user/make/complain/${o._id}`}> Complain</Link></div></p></Col>
                                <Col md={1} xs={12} style={{ "fontSize": "18px" }} onClick={() => copyID(o._id)}><i class="far fa-copy"></i></Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </Container>
    )
}

export default ListOrder

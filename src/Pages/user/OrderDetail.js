import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDetailOrder } from '../../functions/order'
import { Row, Col, ListGroup, Image, Container } from 'react-bootstrap'
import '../../css/ListOrder.css'

import StatusBar from './StatusBar'
import Loader from '../../components/Loader'

const OrderDetail = ({ match }) => {

    const user = useSelector(state => state.user)
    const [orderData, setOrderData] = useState('')
    const [loading, setLoading] = useState(false)
    const step = match.params.status

    useEffect(() => {
        window.scrollTo(0, 0)
        if (user) {
            listOrder()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const listOrder = () => {
        setLoading(true)
        getDetailOrder(match.params.id, user && user.token).then(res => {
            setLoading(false)
            setOrderData(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Container className="order-list-container" style={{ margin: "auto" }}>

            <h3 style={{ marginTop: 35, marginBottom: 30 }}>Order Status <i class="fas fa-truck"></i></h3>
            {loading ? <Loader /> :
                <>
                    <ListGroup variant='flush' style={{ "margin-top": "30px" }}>
                        <ListGroup.Item className="progress-bar" style={{ padding: 20 }}>
                            <Row>
                                <StatusBar status={step} />
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item className="shipping-form" style={{ border: 'none', borderBottom: "2px solid #f7f7f9" }}>
                        <Row>
                            <Col md={2} xs={3}>
                                <h3 className="order-heading">Image</h3>
                            </Col>
                            <Col md={3} xs={3}>
                                <h3 className="order-heading">Name</h3>
                            </Col>
                            <Col md={3} xs={2}>
                                <h3 className="order-heading">Price</h3>
                            </Col>
                            <Col md={2} xs={2}>
                                <h3 className="order-heading">Qty</h3>
                            </Col>
                            <Col md={2} xs={2}>
                                <h3 className="order-heading">Total</h3>
                            </Col>

                        </Row>
                    </ListGroup.Item>
                    {
                        orderData && orderData.map(o => (
                            <>
                                <ListGroup.Item key={o._id} className="shipping-form" style={{ border: 'none', borderBottom: "2px solid #f7f7f9" }}>
                                    <Row>
                                        <Col md={2} xs={3}>
                                            <Image style={{ "height": "75px", "width": "75px" }} src={o.productId.images[0].url} alt={o.productId.images[0].name} fluid rounded />
                                        </Col>
                                        <Col md={3} xs={3}>
                                            <Link to={`/product/${o.productId._id}`}><p className="text-dark">{o.productId.name}</p></Link>
                                        </Col>
                                        <Col md={3} xs={2} style={{ "fontSize": "18px" }}>₹{o.productId.price}</Col>
                                        <Col md={2} xs={2}>
                                            <h6>{o.totalQty}</h6>
                                        </Col>
                                        <Col md={2} xs={2}>
                                            <h6>₹{o.totalAmount}</h6>

                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            </>
                        ))

                    }
                </>
            }

        </Container>
    )
}

export default OrderDetail

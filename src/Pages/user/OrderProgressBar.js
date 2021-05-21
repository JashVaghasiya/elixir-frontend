import React, { useEffect, useState } from 'react'
import { Steps } from 'antd';
import { ListGroup, Row, Container } from 'react-bootstrap'

const { Step } = Steps;

const OrderProgressBar = ({ status }) => {

    const [active, setActive] = useState('')

    useEffect(() => {
        setActive(document.getElementById(status))
    }, [status])

    if ((status && status) && (active && active)) {
        if (status === 'invoice') {
            document.getElementById('payment').classList.add("active-step")
        }
        if (status === 'payment') {
            document.getElementById('shipping').classList.add("active-step")
        }
        if (status === 'shipping') {
            document.getElementById('cart').classList.add("active-step")
        }
        active.classList.add("active-step")
    }

    return (
        <Container>
            <ListGroup className="order-progress-bar" variant='flush' style={{ "margin-top": "30px" }}>
                <ListGroup.Item className="progress-bar">
                    <Row>
                        <Steps type="navigation" responsive={true} size="small">
                            <Step title="Cart" id="cart" icon={<i class="fas fa-shopping-cart"></i>} />
                            <Step title="Address" id="shipping" icon={<i class="fas fa-map-marked-alt"></i>} />
                            <Step title="Payment" id="payment" icon={<i class="fas fa-credit-card"></i>} />
                            <Step title="Invoice" id="invoice" icon={<i class="fas fa-file-invoice"></i>} />
                        </Steps>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default OrderProgressBar

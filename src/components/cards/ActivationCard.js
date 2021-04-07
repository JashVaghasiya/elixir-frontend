import React from 'react'
import { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ApprovalCard.css'

const ActivationCard = ({ p, setId }) => {

    return (
        <Card style={{ width: '20.5rem', borderRadius: "10px", background: "#4d4d4d" }}>
            <Card.Body>
                <Card.Title style={{ fontWeight: "700", fontSize: "16px" }}>
                    <Link to={`/seller/${p.productId}`}> Id:
                    #{p._id}</Link>
                </Card.Title>
                <Card.Text>

                    <p style={{ marginTop: "4px" }}>
                        Name: {p.name.length > 50 ? p.name.substr(0, 40).concat("...") : p.name}
                    </p>
                    {p.role === 'seller' ? <p>Package: {p.package}</p> : ''}
                    {/* {p.role === 'seller' ? <p>RemainingDays: {p.remainingDays}</p> : ''}
                    {p.role === 'seller' ? <p>RemainingProducts: {p.remainingProducts}</p> : ''} */}
                </Card.Text>
                <Button className={p.activated ? 'btn btn-danger' : 'btn btn-success'} onClick={() => setId(p._id)}>{p.activated ? "Deactivate" : "Activate"}</Button>
            </Card.Body>
        </Card>
    )
}

export default ActivationCard

import React from 'react'
import { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ApprovalCard.css'

const ActivationCard = ({ p, setId }) => {

    return (
        <Card style={{ width: '34rem', borderRadius: "10px" }}>
            <Card.Body>
                <Card.Title style={{ fontWeight: "700", fontSize: "16px" }}>
                    <Link to={`/seller/${p.productId}`}> Id:
                    #{p._id}</Link>
                </Card.Title>
                <Card.Text>

                    <p style={{ marginTop: "4px" }}>
                        Name: {p.name.length > 50 ? p.name.substr(0, 40).concat("...") : p.name}
                    </p>
                    {p.role === 'seller' ? <p>Package: {p.role}</p> : ''}
                </Card.Text>
                <Button className={p.activated ? 'btn btn-danger' : 'btn btn-primary'} onClick={() => setId(p._id)}>{p.activated ? "Deactivate" : "Activate"}</Button>
            </Card.Body>
        </Card>
    )
}

export default ActivationCard
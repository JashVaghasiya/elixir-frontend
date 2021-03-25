import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ApprovalCard.css'

const ApprovalCard = ({ p, approve, reject }) => {


    return (
        <Card style={{ width: '34rem', borderRadius: "10px" }}>
            <Card.Body>
                <Card.Title style={{ fontWeight: "700" }}>
                    <Link to={`/seller/${p.productId}`}>Seller Id:
                    #{p.seller}</Link>


                    <label className="switch" onClick={() => approve(p._id)}>
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <p className="approve">
                        Approve
                        </p>
                </Card.Title>
                <Card.Text>
                    <p style={{ fontWeight: "600" }}>
                        Product Id: #{p._id}
                    </p>
                    <p style={{ marginTop: "4px" }}>
                        Product Name: {p.name.length > 50 ? p.name.substr(0, 40).concat("...") : p.name}
                    </p>
                    <Button className="btn btn-danger" style={{ float: "right", marginLeft: "10px" }} onClick={() => reject(p._id)}>Reject</Button>
                    <Link className="btn btn-primary" style={{ float: "right" }} to={`/product/${p._id}`}>Details</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ApprovalCard

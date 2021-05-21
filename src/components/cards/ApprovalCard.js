import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../css/ApprovalCard.css'

const ApprovalCard = ({ p, approve, reject }) => {


    return (
        <Card style={{ marginRight: "10px", width: '25rem', borderRadius: "10px", background: "#4d4d4d4d" }}>
            <Card.Body>
                <Card.Title style={{ fontWeight: "700" }}>
                    <Link to={`/admin/seller/${p.seller._id}`}><p style={{ fontSize: "15px", color: "#fff" }}>Seller Id:
                    #{p.seller._id}</p></Link>
                </Card.Title>
                <Card.Text>
                    <Link to={`/product/${p._id}`}><p style={{ fontWeight: "400", fontSize: "15px", color: "#fff" }}>Product Id: #{p._id}</p></Link>
                    <p style={{ color: "#fff", height: "50px" }}>
                        Product Name: {p.name.length > 50 ? p.name.substr(0, 50).concat("...") : p.name}
                    </p>
                    <Button className="btn btn-danger" style={{ float: "right", marginLeft: "10px" }} onClick={() => reject(p)}>Reject</Button>
                    <Button className="btn btn-success" style={{ float: "right", marginLeft: "10px" }} onClick={() => approve(p._id)}>Approve</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ApprovalCard

import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ActivationCard = ({ user, p, setId }) => {

    return (
        <Card style={{ width: '21rem', borderRadius: "10px", background: "#4d4d4d" }}>
            <Card.Body>
                <Card.Title style={{ fontWeight: "700", fontSize: "16px" }}>
                    <Link to={(user && user.role === "admin" && p.role === "seller" && `/admin/seller/${p._id}`) || (user && user.role === "seller" && `/product/${p._id}`)}> Id:
                    #{p._id}</Link>
                </Card.Title>
                <Card.Text>
                    <p style={{ marginBottom: "0px", marginTop: "4px", display: "flex", color: "#fff" }}>
                        Name: {p.name.length > 50 ? <p style={{ color: "#fff", marginLeft: "5px" }}>{p.name.substr(0, 40).concat("...")}</p> : <p style={{ color: "#fff", marginLeft: "5px" }}>{p.name}</p>}
                    </p>
                    {user.role === 'user' && <p style={{ display: "flex", color: "#fff" }}>
                        Email: <p style={{ color: "#fff", marginLeft: "5px" }}>{p.email.length > 20 ? p.email.substr(0, 20).concat('...') : p.email}</p>
                    </p>}
                    {user.role === 'seller' && p.stock && <p style={{ display: "flex", color: "#fff" }}>
                        Stock: <p style={{ color: "#fff", marginLeft: "5px" }}>{p.stock}</p>
                    </p>}
                    {user.role === 'admin' && <p style={{ display: "flex", color: "#fff" }}>Package Name: {p.packageName && (p.packageName).toUpperCase()}</p>}
                    {user.role === 'admin' && <p style={{ display: "flex", color: "#fff" }}>Remaining Days: {p.remainingDays && p.remainingDays}</p>}
                    {user.role === 'admin' && <p style={{ display: "flex", color: "#fff" }}>Remaining Products: {p.remainingProducts && p.remainingProducts}</p>}
                </Card.Text>
                <Button className={p.activated ? 'btn btn-danger mt-2' : 'btn btn-success mt-2'} onClick={() => setId(p._id)}>{p.activated ? "Deactivate" : "Activate"}</Button>
            </Card.Body>
        </Card>
    )

}

export default ActivationCard

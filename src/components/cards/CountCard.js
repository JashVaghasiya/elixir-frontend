import React from 'react'
import { Card } from 'react-bootstrap'

const DisplayCard = ({ data }) => {
    return (
        <Card style={{ width: '22rem', borderRadius: "10px" }}>
            <Card.Body>
                <Card.Title style={{ fontWeight: "700", fontSize: "16px" }}>
                    {data.name}
                </Card.Title>
                <Card.Text style={{ fontWeight: "900", fontSize: "24px" }}>
                    {data.count}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DisplayCard

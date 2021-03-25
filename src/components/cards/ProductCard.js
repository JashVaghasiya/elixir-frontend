import React from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Meta } = Card

const ProductCard = ({ p, removeProduct }) => {

    return (
        <Card
            style={{ width: 300 }}
            cover={<img alt={p.name ? p.name : ''} src={p.images && p.images.length > 0 ? p.images[0].url : ''} style={{ width: 300, height: 250, padding: "5px" }} />}

            actions={
                [
                    <div className="text-danger">
                        <DeleteOutlined key="setting" onClick={() => removeProduct(p._id)} />
                    </div>,
                    <div>
                        <Link to={`/seller/product/${p && p._id}`}><EditOutlined className="text-success" tooltip="Edit" /></Link>
                    </div>,
                ]}
        >
            <Meta
                title={p.name.length > 30 ? p.description.substring(0, 30).concat("...") : p.name}
                description={p.rejected ? <h5 className="text-danger">Rejected By Admin</h5> : p.description.length > 70 ? p.description.substring(0, 70).concat("...") : p.description}
            />
        </Card>
    )
}

export default ProductCard



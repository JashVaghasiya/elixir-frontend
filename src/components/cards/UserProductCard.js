import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const { Meta } = Card;

const UserProductCard = ({ product }) => {
    return (
        <>
            <Card
                style={{ width: 300, margin: "10px" }}
                cover={
                    <img style={{ height: 250, width: 300, padding: 5 }}
                        alt={product.images[0].name}
                        src={product.images[0].url}
                    />
                }
                actions={[
                    <>
                        <EyeOutlined className="text-success" />
                        <Link to={`/product/${product._id}`}>
                            View Product
                        </Link>
                    </>,
                ]}
            >
                <Meta
                    title={product.name.length > 20 ? product.name.substring(0, 20).concat("...") : product.name}
                    description={product.description.substring(0, 65).concat("...")}
                />
            </Card>
        </>
    )
}

export default UserProductCard

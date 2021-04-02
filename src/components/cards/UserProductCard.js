import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const { Meta } = Card;

const UserProductCard = ({ product }) => {
    return (
        <>
            {/* <Card
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
            </Card> */}
            <div class="card" style={{ width: "18rem", height: "22rem" }}>
                <img class="card-img-top" style={{ height: "10rem" }} src={product.images[0].url} alt={product.images[0].name} />
                <div class="card-body">
                    <h5 class="card-title black">{product.name.length > 20 ? product.name.substring(0, 20).concat("...") : product.name}</h5>
                    <p class="card-text black">{product.description.substring(0, 65).concat("...")}</p>
                    <a href="#" class="btn btn-primary">View Product</a>
                </div>
            </div>
        </>
    )
}

export default UserProductCard

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Image } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Carousel, Alert } from 'react-bootstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ListGroup from 'react-bootstrap/ListGroup'
import { getProduct } from '../../functions/product'
import { addToCart } from '../../functions/cart'
import { addToWishlist } from '../../functions/wishlist'



const ProductDetails = ({ match, history }) => {

    const user = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorCart, setErrorCart] = useState(null)
    const [errorWishlist, setErrorWishlist] = useState(null)

    useEffect(() => {
        getProducts()
    }, [user])

    const getProducts = async () => {
        setLoading(true)
        await getProduct(match.params.id).then(res => {
            setProduct(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleAddToCart = async () => {
        await addToCart(user && user._id, product._id, quantity, user.token).then(res => {
            if (res.data.alreadyAdded) {
                setErrorCart(res.data.alreadyAdded)
            } else {
                history.push('/user/cart')
            }

        }).catch(error => {
            console.log(error)
        })
    }

    const handleWishlist = async () => {
        await addToWishlist(user && user._id, product._id, user && user.token).then(res => {
            if (res.data.alreadyAdded) {

                setErrorWishlist(res.data.alreadyAdded)
            } else {
                history.push('/user/wishlist')
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const handleBuyNow = () => {
        //
    }

    return (
        <div>
            {loading ? "Loading..." :

                <div className="row">
                    <div className="col-md-4" style={{ marginLeft: 27, marginTop: 20, padding: 10 }}>
                        {
                            product && product.images && product.images.length > 0 ?
                                (
                                    <Carousel>

                                        {product.images && product.images.map(i => <Carousel.Item key={i.name} className="carousel-main"> <Image style={{ height: 600, width: 300 }} className="d-block w-100" alt={i.name} src={i.url} key={i.url} /></Carousel.Item>)}

                                    </Carousel>
                                ) : ""
                        }
                    </div>
                    <div className="col-md-4">
                        <h1 style={{ padding: "10px", marginTop: "17px" }}>{product.name}</h1>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Type</strong><span className="" style={{ float: 'right' }}>{product.type}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Brand</strong><span className="" style={{ float: 'right' }}>{product.brand}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Category</strong><span className="" style={{ float: 'right' }}><Link>{product && product.category.name}</Link></span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Sub Category</strong><span className="label" style={{ float: 'right' }}>{product && product.subs.map(s => (<Link key={s._id} to={``} style={{ marginLeft: 10 }}>{s.name}</Link>))}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Price</strong><span className="" style={{ float: 'right', marginTop: "10px" }}>{product.price}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Description</strong><span className="" style={{ float: 'right', marginTop: "10px" }}>{product.description}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <button className="btn btn-info p-2" style={{ width: "100%" }} onClick={handleWishlist}>
                                        <HeartOutlined className="text-white m-2" />
                    Add to Wishlist
                    </button>
                                    {errorWishlist !== null ? <Alert className="mt-2" variant="danger">{errorWishlist}</Alert> : ''}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                    <div className="col-md-3" style={{ marginTop: 92 }}>
                        <Card
                        >
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h1 style={{ padding: "5px", marginTop: "5px" }}>Rs. {product.price}</h1>
                                </ListGroup.Item>

                            </ListGroup>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Quantity</strong>
                                    <select onChange={(e) => setQuantity(e.target.value)} className="form-control mt-2">
                                        {
                                            [...Array(5).keys()].map(q => (
                                                <option key={q + 1} value={q + 1}>{q + 1}</option>
                                            ))
                                        }
                                    </select>
                                </ListGroup.Item>

                            </ListGroup>
                            <hr />
                            <button onClick={handleAddToCart} className="btn btn-info p-2" style={{ width: "100%" }}><ShoppingCartOutlined className="text-white m-2" />Add to Cart</button>
                            {errorCart !== null ? <Alert className="mt-2" variant="danger">{errorCart}</Alert> : ''}
                            <hr />
                            <button className="btn btn-info p-2" style={{ width: "100%" }} onClick={handleBuyNow}>
                                <CheckCircleOutlined className="text-white m-2" />
                    Buy Now
                    </button>
                        </Card>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails

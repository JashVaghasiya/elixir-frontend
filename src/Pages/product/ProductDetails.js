import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Image } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Carousel } from 'react-bootstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import noImage from '../../images/non-veg.png'
import ListGroup from 'react-bootstrap/ListGroup'
import { getProduct } from '../../functions/product'
import { addToCart, addToWishlist, listCart, listWishlist } from '../../functions/user'
import { Toast } from 'react-bootstrap'


const ProductDetails = ({ match, history }) => {

    const user = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState('')
    const [loading, setLoading] = useState(false)
    const [wishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])
    const [cartProduct, setCartProduct] = useState(null)
    const [wishlistProduct, setWishlistProduct] = useState(null)

    useEffect(() => {
        getWishlist()
        getCart()
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoading(true)
        await getProduct(match.params.id).then(res => {
            console.log(res.data);
            setProduct(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const getWishlist = async () => {
        await listWishlist(user && user.token).then(res => {
            setWishlist(res.data.wishlist);
            console.log("Wishlist: ", res.data.wishlist);
            const result = wishlist.find(w => w.productId === product._id)
            setWishlistProduct(result)
        }).catch(err => {
            console.log(err);
        })
    }

    const getCart = async () => {
        await listCart(user && user._id, user && user.token).then(res => {
            setCart(res.data);
            console.log("Cart: ", res.data);
            setCartProduct(cart.filter(c => c.productId === product._id))
        }).catch(err => {
            console.log(err);
        })
    }

    const handleAddToCart = async () => {
        await addToCart(user._id, product._id, quantity, user.token)
        history.push('/cart')
    }

    const handleWishlist = async () => {
        await addToWishlist(user && user._id, product._id, user && user.token)
        history.push('/user/wishlist')
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
                                    <button disabled={wishlistProduct === null} className="btn btn-info p-2" style={{ width: "100%" }} onClick={handleWishlist}>
                                        <HeartOutlined className="text-white m-2" />
                    Add to Wishlist
                    </button>
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
                                            [...Array(product.stock).keys()].map(q => (
                                                <option key={q + 1} value={q + 1}>{q + 1}</option>
                                            ))
                                        }
                                    </select>
                                </ListGroup.Item>

                            </ListGroup>
                            <hr />
                            <button disabled={cartProduct === null} onClick={handleAddToCart} className="btn btn-info p-2" style={{ width: "100%" }}><ShoppingCartOutlined className="text-white m-2" />Add to Cart</button>
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

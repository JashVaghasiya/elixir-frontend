import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getProduct } from '../../functions/product'
import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import { addToCart } from '../../functions/cart'
import { addToWishlist } from '../../functions/wishlist'
import { addReview,getReviews } from '../../functions/review'
import Slider from "react-slick";
import '../../css/Product.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRatings from 'react-star-ratings';
import Veg from '../../images/veg.png'
import NonVeg from '../../images/non-veg.png'

const ProductPage = ({ match, history }) => {

    const user = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorCart, setErrorCart] = useState(null)
    const [errorReview, setErrorReview] = useState(null)
    const [errorWishlist, setErrorWishlist] = useState(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState(null)
    const [reviews, setReviews] = useState('')
    const [wishlistRedirection, setWishlistRedirection] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        const getProducts = async () => {
            setLoading(true)
            await getProduct(match && match.params.id).then(res => {
                setProduct(res.data)
                setLoading(false)
                
            }).catch(err => {
                console.log(err)
                
            })
        }
        return getProducts()
    }, [user, match ,match.params.id])

    useEffect(()=>{

    const getReview=async()=>{
        await getReviews(match && match.params.id).then(res=>{
            setReviews(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }
        return getReview()
    },[match, match.params.id])

    

    const handleWishlist = async () => {
        if(user === null){
            history.push('/login')
        }else if (user !== null && user.role === "seller") {
            history.push('/seller/dashboard')
        } else if (user !== null && user.role === "admin") {
            history.push('/admin/dashboard')
        } else if (user !== null && user.role === "agency") {
            history.push('/agency/1')
        } else if (user !== null && user.role === "doctor") {
            history.push('/chat')
        }else{
        await addToWishlist(user && user._id, product._id, user && user.token).then(res => {
            if (res.data.alreadyAdded) {
                setErrorWishlist(res.data.alreadyAdded)
                setTimeout(() => {
                    setErrorWishlist(null)
                }, 5000)
            } else {
                setWishlistRedirection(true)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    }

    const handleAddToCart = async () => {
        if(user === null){
            history.push('/login')
        }else if (user !== null && user.role === "seller") {
            history.push('/seller/dashboard')
        } else if (user !== null && user.role === "admin") {
            history.push('/admin/dashboard')
        } else if (user !== null && user.role === "agency") {
            history.push('/agency/1')
        } else if (user !== null && user.role === "doctor") {
            history.push('/chat')
        }else{
        await addToCart(user && user._id, product._id, quantity, user&&user.token).then(res => {
            console.log(res)
            if (res.data.alreadyAdded) {
                setErrorCart(res.data.alreadyAdded)
                setTimeout(() => {
                    setErrorCart(null)
                }, 5000)
            } else {
                history.push('/user/cart')
            }
        }).catch(error => {
            console.log(error)
        })
        }   
    }

    const submitReview = async () => {
        if(rating === 0 ){
            setErrorReview("Select Rating!")
        }else if(comment === null){
            setErrorReview("Enter Comment!")
        }else{
            await addReview(rating, comment, user && user._id, product._id, user && user.token).then(res => {
                if (res.data.alreadyReviewed) {
                    setErrorReview(res.data.alreadyReviewed)
                    setTimeout(() => {
                        setErrorReview(null)
                    }, 5000)
                }
                if (res.data.notPurchased) {
                    setErrorReview(res.data.notPurchased)
                }
                if (res.data) {
                    console.log(res.data)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const handleGoToWishlist = () => history.push('/user/wishlist')

    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 3000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <div class="product-page">
        {loading ? <Loader/> :
                <>
                    <div className="product-page-grid">
                        <div className="section-1">  
                        <Slider {...settings}>     
                            {product && product.images.length > 0 && product.images.map(i =>
                                    <img alt={i.name} src={i.url} key={i.url} />
                            )}
                        </Slider>
                        </div>
                        <div className="section-2">
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product&&product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product&&product.rating} text={`${product&&product.numReviews} review`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Type</strong>{product&&product.type==='veg'?<img style={{height:30,width:30,float:"right"}} alt="veg" src={NonVeg}/>:<img style={{height:30,width:30,float:"right"}} alt="non-veg" src={Veg}/>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Brand</strong><span className="" style={{ float: 'right' }}>{product&&product.brand}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Description</strong>: <br/>{product&&product.description.length>300?product.description.substr(0,300).concat("..."):product.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Category</strong><span style={{ float: 'right' }}><Link to={`/product/find?category=${product && product.category._id}`}><h5>{product && product.category.name}</h5></Link></span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong> Sub Category</strong><span className="label" style={{ display:"flex", float: 'right' }}>{product && product.subs.map(s => (<Link key={s._id} to={`/product/find?subcategory=${s._id}`} className="sub-link"><hs>{s.name}</hs></Link>))}</span>
                                </ListGroup.Item>

                            </ListGroup>
                        </div>
                        <div className="section-3">
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>₹ {product&&product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product&&product.stock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.stock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty:
                                                  
                                                </Col>
                                                <Col>  <select onChange={(e) => setQuantity(e.target.value)}>
                                                        {
                                                            product&&product.stock === 0 ? <option selected >Out Of Stock</option> :
                                                               product&& product.stock > 5 ? [...Array(5).keys()].map(q => (
                                                                    <option key={q + 1} value={q + 1} >{q + 1}</option>
                                                                )) : [...Array(product.stock).keys()].map(q => (
                                                                    <option key={q + 1} value={q + 1} >{q + 1}</option>
                                                                ))
                                                        }
                                                    </select> {(product&&product.form === "syrup") || (product&&product.form === "drops") ? <p className="product-page-qty">×{product&&product.qtyPerPack}ml per bottle</p> : <p className="qty">×{product&&product.qtyPerPack} per pack</p>}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                    <button className='btn-block form-button' disabled={product.stock === 0} type='button' onClick={() => handleAddToCart()}>Add to Cart</button>
                                    {wishlistRedirection===false?<button className='btn-block wishlist-button' type='button' onClick={() => handleWishlist()}>Add to Wishlist</button>:<button className='btn-block form-button' type='button' onClick={() => handleGoToWishlist()}>Go to Wishlist {"  "}<i class="fas fa-arrow-circle-right"></i></button>}
                                        {errorCart && <Alert variant="light">{errorCart}</Alert>}{errorWishlist && <Alert variant="light">{errorWishlist}</Alert>}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                   
                    <div className="product-review">
                        <div className="review-section-1 mt-3">
                        <ListGroup variant="flush">
                            {reviews && reviews.length === 0 ? <Alert variant="dark">No Customer Reviews</Alert> : (
                                <>
                                <h2>REVIEWS</h2>
                                {reviews && reviews.map(review => (
                                  
                                    <ListGroup.Item key={review&&review._id}  style={{padding:"0px"}}>
                                        <strong>{review&&review.user.name}</strong>
                                        <div className="review-date">
                                        <Rating value={review&&review.rating} text='' />
                                        <p className="ml-2">{review&&review.createdAt.substring(0, 10)}</p>
                                        </div>
                                        <p>{review&&review.comment}</p>
                                    </ListGroup.Item>))}
                            </> 
                            )}
                            </ListGroup>
                            <hr/>
                        </div>
                        
                        <div className="review-section-2">
                        <h2>WRITE A REVIEW</h2>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={{padding:"0px"}}>
                                    {errorReview && <Alert variant="danger">{errorReview}</Alert>}
                                    {user && user.token ? (
                                        <>
                                            <Form.Group controlId="rating">
                                                <StarRatings
                                                    rating={rating}
                                                    starRatedColor="orange"
                                                    starEmptyColor="#acacac"
                                                    starHoverColor="orange"
                                                    changeRating={(newRating)=>setRating(newRating)}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="25px"
                                                    starSpacing="2px"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control className="text-area" as='textarea' row='3' placeholder='Enter Comment. . .' value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <button className="form-button" onClick={() => submitReview()}>Add Review</button>
                                            </>
                                    ) : <Alert variant='dark' classNam="text-white">Please <Link to='/login'>SignIn</Link> to write review</Alert>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </div> 
                    </div>
                    </div>
               </>
               }
        </div>
    )
}

export default ProductPage

import React, { useState, useEffect } from 'react'
import { getHomePageProducts, getTopFeatured, getTopGrossing, getTopRated } from '../../functions/product'
import HomeProductCard from '../../components/cards/HomeCard'
import '../../css/ProductCard.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/Home.css'
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import firebase from 'firebase'
import { Container } from 'react-bootstrap'
import Company1 from '../../images/Company1.jpeg'
import Company2 from '../../images/Company2.jpeg'
import Company3 from '../../images/Company3.jpeg'
import Company4 from '../../images/Company4.jpeg'
import Company5 from '../../images/Company5.jpeg'
import HomePaginator from '../../components/paginator/HomePaginator';
import { useSelector } from 'react-redux'

const Home = ({ match, history }) => {

    const [products, setProducts] = useState([])
    const [topRated, setTopRated] = useState([])
    const [topGrossing, setTopGrossing] = useState([])
    const [topFeatured, setTopFeatured] = useState([])
    const [posterUrl, setPosterUrl] = useState([])
    const [loading, setLoading] = useState(false)
    const pageNumber = match.params.pageNumber || 1
    const [pages, setPages] = useState(1)
    const user = useSelector(state => state.user)
    useEffect(() => {
        window.scrollTo(0, 0)
        loadAllProduct()
        if (user !== null && user.role === "seller") {
            history.push('/seller/dashboard')
        } else if (user !== null && user.role === "admin") {
            history.push('/admin/dashboard')
        } else if (user !== null && user.role === "agency") {
            history.push('/agency/1')
        } else if (user !== null && user.role === "doctor") {
            history.push('/chat')
        }
    }, [user, history])

    const adsSettings = {
        infinite: true,
        speed: 3000,
        autoplaySpeed: 6000,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        rows: 2,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    let settings = {
        // dots: true,
        infinite: true,
        speed: 3000,
        autoplaySpeed: 6000,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    let posterSettings = {
        infinite: true,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    const loadAllProduct = () => {

        setLoading(true)
        getTopRated().then(res => {
            setTopRated(res.data)
        }).catch(err => {
            console.log(err);
        })
        getTopGrossing().then(res => {
            setTopGrossing(res.data)
        }).catch(err => {
            console.log(err);
        })
        getTopFeatured().then(res => {
            setTopFeatured(res.data)
        }).catch(err => {
            console.log(err);
        })
        setPosterUrl([])
        firebase.storage().ref('posters/').list().then(result => {
            result._delegate.items.forEach(p => {
                const image = firebase.storage().ref(p._location.path_)
                image.getDownloadURL().then(downloadURL => {
                    setPosterUrl(posterUrl => [...posterUrl, { name: p._location.path_, url: downloadURL }])
                })
            })
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getHomePageProducts(pageNumber).then(res => {
            setProducts(res.data.result)
            setPages(res.data.pages)
        }).catch(err => {
            console.log(err);
        })
    }, [pageNumber])



    return (
        <div className="home" style={{ background: "#eeeeee" }}>
            {loading ? <Loader /> : <>
                <div className="home-poster">
                    <Slider arrows={false} className="home-main-poster" {...posterSettings}>
                        {posterUrl && posterUrl.map(p => (
                            <img height="250px" key={p.url} src={p.url} alt={p.name} />
                        ))}
                    </Slider>
                    <Link className="home-side-poster" to="/doctor/registration"><img class="poster-image" height="250px" src="https://firebasestorage.googleapis.com/v0/b/elixir-fbae4.appspot.com/o/Capture.PNG?alt=media&token=f95ee4a7-3bac-40b6-afb2-b0715418f244" alt="consultant" /></Link>
                </div>
                <div className="m-4">
                    <h5 className="home-title mt-2">All Products</h5>
                    <h6 className="home-subtitle">Medicines and health products</h6>
                    <div className="product-wrapper mt-3" id="responsive">
                        {products && products.map(product => (
                            <HomeProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <HomePaginator pages={pages} pageNumber={pageNumber} />

                    {topFeatured && topFeatured.length > 0 && <>
                        <hr className="mt-3" />
                        <h5 className="home-title mt-2">Featured Products</h5>
                        <h6 className="home-subtitle">Recommended by consultants</h6></>}
                    <Slider arrows={false} {...adsSettings}>
                        {topFeatured && topFeatured.map(product => (
                            <HomeProductCard key={product._id} product={product.productId} />
                        ))}
                    </Slider>
                    <hr className="mt-3" />
                    <h5 className="home-title mt-2">Best Seller Products</h5>
                    <h6 className="home-subtitle">Our most popular products based on sales</h6>
                    <Slider arrows={false} {...settings}>

                        {topGrossing && topGrossing.map(product => (
                            <div key={product._id}>
                                <HomeProductCard product={product} />
                            </div>
                        ))}

                    </Slider>
                    <hr className="mt-3" />
                    <h5 className="home-title mt-3">Highest Rated Products</h5>
                    <h6 className="home-subtitle">Our most liked products based on customer reviews</h6>
                    <Slider arrows={false} {...settings}>

                        {topRated && topRated.map(product => (
                            <div>
                                <HomeProductCard key={product._id} product={product} />
                            </div>
                        ))}

                    </Slider>
                </div>
                <div className="doctor-section mt-5">
                    <div className="doctor-text">
                        <h3>Consult with Doctors of over 12+ Specialities,over <span>Chat</span></h3>
                        <h5 className="mt-3">Skip the struggle of booking appointments,</h5>
                        <h5> Consult a doctor at your ease</h5>
                        <Link className="form-button mt-3" to="/chat">Consult Now</Link>
                    </div>
                    <div className="doctor-video">
                        <video autoPlay loop muted src="https://res.cloudinary.com/du8msdgbj/video/upload/v1560927917/eConsult-final_ro63yx.webm" type="video/mp4" />
                    </div>
                </div>
                <section className="py-1 bg-light" id="client">
                    <Container className="pt-2 pb-5">
                        <h5 className="text-center section-title m-3 mt-5" style={{ fontWeight: "600", fontSize: "24px" }}>Our Investors</h5>
                        <div className="images p-5">
                            <div><img src={Company1} alt="company" /></div>
                            <div><img src={Company2} alt="company" /></div>
                            <div><img src={Company3} alt="company" /></div>
                            <div><img src={Company4} alt="company" /></div>
                            <div><img src={Company5} alt="company" /></div>
                        </div>
                    </Container>
                </section>
            </>}
        </div>
    )
}
export default Home

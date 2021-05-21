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

const Home = () => {

    const [products, setProducts] = useState([])
    const [topRated, setTopRated] = useState([])
    const [topGrossing, setTopGrossing] = useState([])
    const [topFeatured, setTopFeatured] = useState([])
    const [posterUrl, setPosterUrl] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        loadAllProduct()
    }, [])

    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 3000,
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
        autoplaySpeed: 3000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    const loadAllProduct = () => {

        setLoading(true)
        getHomePageProducts().then(res => {
            setProducts(res.data)
        }).catch(err => {
            console.log(err);
        })
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



    return (
        <div className="home" style={{ background: "#fff" }}>
            {loading ? <Loader /> : <>
                <Slider arrows={false} className="home-poster" {...posterSettings}>
                    {posterUrl && posterUrl.map(p => (
                        <img height="350px" key={p.url} src={p.url} alt={p.name} />
                    ))}
                </Slider>
                <div className="m-4">
                    {topFeatured && topFeatured.length > 0 && <><h3 className="text-center m-3">Featured Products</h3><div className="bottom-line"></div></>}
                    <Slider arrows={false} {...settings}>
                        {topFeatured && topFeatured.map(product => (
                            <div key={product.productId._id}>
                                <HomeProductCard product={product.productId} />
                            </div>
                        ))}
                    </Slider>
                    <h3 className="text-center section-title m-3">Highest Grossing Products</h3>
                    <div className="bottom-line"></div>
                    <Slider arrows={false} {...settings}>

                        {topGrossing && topGrossing.map(product => (
                            <div key={product._id}>
                                <HomeProductCard product={product} />
                            </div>
                        ))}

                    </Slider>
                    <h3 className="text-center section-title m-3 mt-5">Top Rated Products</h3>
                    <div className="bottom-line"></div>
                    <Slider arrows={false} {...settings}>

                        {topRated && topRated.map(product => (
                            <div>
                                <HomeProductCard key={product._id} product={product} />
                            </div>
                        ))}

                    </Slider>
                    <h3 className="text-center section-title m-3 mt-5">All Products</h3>
                    <div className="bottom-line"></div>
                    <div className="product-wrapper mt-3" id="responsive">
                        {products && products.map(product => (
                            <HomeProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
                <div className="doctor-section">
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
            </>}
        </div>
    )
}
export default Home

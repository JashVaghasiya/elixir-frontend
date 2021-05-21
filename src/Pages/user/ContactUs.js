import React from 'react'
import '../../css/About.css'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    window.scrollTo(0, 0)
    return (
        <>
            <header id="showcase">
                <div class="showcase-content">
                    <h1 style={{ color: "white" }}>GET IN TOUCH</h1>
                    <p style={{ fontSize: 18 }}>Whether you have question about pricing, product or anything else our team is ready to answer all your question.</p>
                    <a className='form-button' href="/">Contact Us</a>
                </div>
            </header>
            <section id="about-a" class="text-align py-3">

                {/* <p>Still Need Help ?</p> */}
                {/* <div class="about-info py-2">
                        <img src={Logo} style={{ height: "155.2px", width: "155px" }} wi alt="" class="bio-image" />
                        <div class="bio bg-light">
                            <h4>You Are At Best Place</h4>
                            <p>Welcome to Elixir (e-pharmacy store) which provides you best medicines from best sellers.Elixir was developed by Three persons who have one vision to provide best of medicine to every place of india.Elixir has come a long way from its begining in a starting location home office.We are now planning to provide medicine delivery to entire globe and we are having three warehouses at New Delhi,Chennai and Australia respectively.</p>
                        </div>
                    </div> */}
                <h1 class="section-title mt-5">We'd love to hear from you</h1>
                <div class="bottom-line mb-2"></div>
                <div class="award">
                    <div class="award-1 py-5">
                        <i class="fas fa-phone-alt fa-3x mb-2"></i>
                        <h3>Call Us</h3>
                        {/* <p>Give us a miss call on</p> */}
                        <p>+0261 7689344</p>
                    </div>
                    <div class="award-2 py-5">
                        <i class="fas fa-envelope fa-3x mb-2"></i>
                        <h3>Email Us</h3>
                        {/* <p>Send us email on</p> */}
                        <p>elixirpharma@gmail.com</p>
                    </div>
                    <div class="award-3 py-5">
                        <i class="fas fa-map-marker-alt fa-3x mb-2"></i>
                        <h3>Post Us</h3>
                        {/* <p>Send letters at</p> */}
                        <p>Elixir Pharma,Delhi NCR</p>
                    </div>
                </div>
            </section>
            <div className="container mt-3 mb-3">
                <p>Want to join our seller community <Link to="/seller/registration" className="red-link">Sign Up</Link></p>
            </div>
        </>
    )
}

export default AboutUs

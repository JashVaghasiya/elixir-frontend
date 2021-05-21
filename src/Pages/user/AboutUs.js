import React from 'react'
import '../../css/About.css'
import Logo from '../../images/elixirLogo.png'

const AboutUs = () => {
    window.scrollTo(0, 0)
    return (
        <>
            <section id="about-a" class="text-align py-3">
                <div class="container">
                    <h2 id="section-title">
                        About Us
                     </h2>
                    <div class="bottom-line"></div>
                    <p class="lead">Let us tell you where we started and where we are...</p>
                    <div class="about-info py-2">
                        <img src={Logo} style={{ height: "155.2px", width: "155px" }} wi alt="" class="bio-image" />
                        <div class="bio bg-light">
                            <h4>You Are At Best Place</h4>
                            <p>Welcome to Elixir (e-pharmacy store) which provides you best medicines from best sellers.Elixir was developed by Three persons who have one vision to provide best of medicine to every place of india.Elixir has come a long way from its begining in a starting location home office.We are now planning to provide medicine delivery to entire globe and we are having three warehouses at New Delhi,Chennai and Australia respectively.</p>
                        </div>
                    </div>
                    <h1 class="section-title mt-5">AWARDS</h1>
                    <div class="bottom-line mb-2"></div>
                    <div class="award">
                        <div class="award-1 py-1">
                            <i class="fas fa-award fa-3x"></i>
                            <h3>Award-1</h3>
                            <p>We are praiced for Best Seller in 2019 by IDAPL.</p>
                        </div>
                        <div class="award-2 py-1">
                            <i class="fas fa-award fa-3x"></i>
                            <h3>Award-2</h3>
                            <p>We are praiced by IMPCL for No 1 E-pharmacy Store of 2020.</p>
                        </div>
                        <div class="award-3 py-1">
                            <i class="fas fa-award fa-3x"></i>
                            <h3>Award-3</h3>
                            <p>We are First Official Online Vaccine Provider of 2021.</p>
                        </div>
                    </div>

                </div>
            </section>
            <div id="about-d">
                <div class="container">
                    <h2 class="section-title text-align mt-5">Testimonial</h2>
                    <div class="bottom-line"></div>
                    <p class="lead text-align">Take a look at what our client says...</p>
                    <div class="testimonials">
                        <div>
                            <p>I can honestly say that they always ga ve an excellent service - from the simplicity of completing the order and ease of filling out the consultation, to the quick dispatch and delivery.they also give me advice and were always happy to help with any queries I had.</p>
                            <ul>
                                <li>
                                    Anjali Gupta,
                                </li>
                                <li> Delhi</li>
                            </ul>
                        </div>
                        <div>
                            <p>I am not a customer anymore but Elixir provided a service at a time in my life when it was truly vital.Without this service I would have probably lost my job and who knows where that would have led.I am sure you have helped people like me all over the India.</p>
                            <ul>
                                <li>
                                    Rajesh Saraiya,
                                </li>
                                <li> Dehradun</li>
                            </ul>
                        </div>
                        <div>
                            <p>I have been using Elixir for years and I cannot say enough good things about them. They are honest, efficient, reasonable in cost and always provide great service!I would ALWAYS and without any reservations i recommend elixir to anyone.</p>
                            <ul>
                                <li>
                                    Brijesh Shah,
                                </li>
                                <li> Meghalaya</li>
                            </ul>
                        </div>
                        <div>
                            <p>Top class company, and second to none,it's very professional and trustworthy. The ladies that answers the emails are so kind and helpful, they really do care about helping in anyway they can. The doctors are always prompt and again very helpful.</p>
                            <ul>
                                <li>
                                    Malhar Gupta,
                                </li>
                                <li> Mumbai</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs

import React, { useState, useEffect } from 'react'
import '../../css/Footer.css'
import Logo from '../../images/elixirLogo.png'
import { Link } from 'react-router-dom'
import { getCount } from '../../functions/user'

const Footer = () => {

    useEffect(() => {

        getData()

    }, [])

    const [orderData, setOrderData] = useState('')
    const [stateData, setStateData] = useState('')
    const [sellerData, setSellerData] = useState('')

    const getData = async () => {

        await getCount().then(res => {
            if (res) {
                setOrderData(res.data[0].count)
                setStateData(res.data[1].count)
                setSellerData(res.data[2].count)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <div id="footer-container">
                <div class="sec-footer">
                    {/* <hr style={{ width: "30%", margin: "10px auto" }} /> */}
                    <h1 class="header">India's No.1 E-Pharmacy Store</h1>
                    <div class="footer-cotnainer pb-5">
                        <div class="sec-section">
                            <h1>{orderData && orderData}</h1>
                            <h5>Orders are Delivered</h5>
                        </div>

                        <div class="sec-section">
                            <h1>{stateData && stateData}</h1>
                            <h5>States are Served</h5>
                        </div>

                        <div class="sec-section">
                            <h1>{sellerData && sellerData}</h1>
                            <h5>Sellers are Registered</h5>
                        </div>
                    </div>
                </div>
                <footer class="footer-container">
                    <div class="p-1 first-section">
                        <hr />
                        <div class="footer-logo">

                            <img class="elixir-logo" src={Logo} alt="NewsGrid" />
                            <h1 class="heading">elixir</h1>

                        </div>
                        <hr />
                        <p>All products displayed on elixir are procured from verified and licensed pharmacies. All products listed on the platform are accredited.</p>
                    </div>
                    <div class="p-1 second-section">
                        <hr />
                        <h2>Contact Info</h2>
                        <hr />
                        <p>Elixir Pharma and Warehouse near Noida Golf Course, Sector 38, Delhi NCR, India - 201303</p>
                        <p>+ 0261 2566788</p>

                        <div class="social">
                            <p>Want to become health advisor?</p>
                            <Link to="/doctor/registration" class="btn-footer btn-footer-dark">Sign Up</Link>
                        </div>
                    </div>
                    <div class="p-1 third-section">
                        <hr />
                        <h2>Site Links</h2>
                        <hr />
                        <ul class="list">
                            <li><Link to="/termsConditions">Terms & Conditions</Link></li>
                            <li><Link to="/privacyPolicy">Privacy & Policy</Link></li>
                            <li><Link to="/aboutUs">About Us</Link></li>
                            <li><Link to="/contactUs">Contact Us</Link></li>
                        </ul>
                        <div class="social">

                            <a href="https://facebook.com" rel="noreferrer" target="_blank"><i class="fab fa-facebook fa-2x"></i></a>
                            <a href="https://twitter.com" rel="noreferrer" target="_blank"><i class="fab fa-twitter fa-2x"></i></a>
                            <a href="https://instagram.com" rel="noreferrer" target="_blank"><i class="fab fa-instagram fa-2x"></i></a>
                            <a href="https://youtube.com" rel="noreferrer" target="_blank"><i class="fab fa-youtube fa-2x"></i></a>

                        </div>
                    </div>
                    <div class="p-1 fourth-section">
                        <hr />
                        <h2> Our Community</h2>
                        <hr />
                        <p>You can also join our seller community to sell products on elixir we are having several packages to for sellers and many other benefits.</p>
                        <Link to="/package" class="btn-footer btn-footer-dark">Join Now</Link>
                    </div>
                    <div id="copy">
                        <div>Copyright &copy; {new Date().getFullYear()}</div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer

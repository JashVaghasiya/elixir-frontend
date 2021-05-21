import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSellerProfile } from '../../functions/seller'
import '../../main.css'
import '../../css/SellerProfile.css'
import { inputField } from '../../main.js'
import SideNavbar from '../../components/nav/Seller'
import SellerHeader from '../../components/nav/HeaderMain'


const SellerProfile = ({ history }) => {

    const user = useSelector(state => state.user)
    const [sellerData, setSellerData] = useState('')

    useEffect(() => {
        inputField()
        if (user) {
            loadSeller()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const loadSeller = () => {
        getSellerProfile(user && user._id, user && user.token).then(res => {
            setSellerData(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const updateSellerProfile = () => {
        history.push(`/seller/update/profile`)
    }

    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SideNavbar active="dashboard" />
                <main>
                    <div className="main__container">
                        <div class="main__title">
                            <h2 style={{ color: "white" }}>Your Profile</h2>
                        </div>
                        <div className="white2"></div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Email</h5>
                                        <input class="input-tag" style={{ color: "black" }} type="text" defaultValue={sellerData.email} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Name</h5>
                                        <input class="input-tag" style={{ color: "black" }} type="text" defaultValue={sellerData.name} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Mobile</h5>
                                        <input class="input-tag" style={{ color: "black" }} type="text" defaultValue={sellerData.mobile} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Address</h5>
                                        <input class="input-tag" style={{ color: "black" }} type="text" defaultValue={sellerData.address} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Created At</h5>
                                        <input class="input-tag" style={{ color: "black" }} type="text" defaultValue={sellerData.createdAt && sellerData.createdAt.substr(0, 10)} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <button className="btn-main p-2 mt-3" onClick={() => updateSellerProfile()}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SellerProfile

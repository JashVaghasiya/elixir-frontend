import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSellerProfile, updateSellerProfile } from '../../functions/seller'
import '../../main.css'
import '../../css/SellerProfile.css'
import { inputField } from '../../main.js'
import SideNavbar from '../../components/nav/Seller'
import SellerHeader from '../../components/nav/HeaderMain'


const SellerProfile = ({ history }) => {

    const id = useSelector(state => state.user._id)
    const user = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState(null)
    const [address, setAddress] = useState("")

    useEffect(() => {
        inputField()
        if (user) {
            loadSeller()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const loadSeller = () => {
        getSellerProfile(user && user._id, user && user.token).then(res => {
            setEmail(res.data.email)
            setName(res.data.name)
            setMobile(res.data.mobile)
            setAddress(res.data.address)
        }).catch(error => {
            console.log(error)
        })
    }

    const saveSellerProfile = () => {
        const data = { id, name, mobile, address }
        updateSellerProfile(data, user && user.token).then(res => {
            history.push(`/seller/profile`)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SideNavbar active="dashboard" />
                <main>
                    <div className="main__container">
                        <div class="main__title">
                            <h2 style={{ color: "white" }}>Update Profile</h2>
                        </div>
                        <div className="white2"></div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Email</h5>
                                        <input class="input-tag" style={{ color: "black" }} type="text" defaultValue={email} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus ">
                                    <div>
                                        <h5>Name</h5>
                                        <input onChange={e => setName(e.target.value)} class="input-tag" style={{ color: "black" }} type="text" defaultValue={name} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Mobile</h5>
                                        <input onChange={e => setMobile(e.target.value)} class="input-tag" style={{ color: "black" }} type="number" defaultValue={mobile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <div class="input-div focus">
                                    <div>
                                        <h5>Address</h5>
                                        <input onChange={e => setAddress(e.target.value)} class="input-tag" style={{ color: "black" }} type="text" defaultValue={address} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seller-profile-content">
                            <div class="form">
                                <button className="btn-main p-2 mt-3" onClick={() => saveSellerProfile()}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SellerProfile

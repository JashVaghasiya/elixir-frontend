import Header from './components/nav/Header'
import DoctorHeader from './components/nav/DoctorHeader'
import { Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Home from '../src/Pages/user/Home'
import Footer from '../src/Pages/user/Footer.js'
import Register from '../src/Pages/user/Register'
import Login from '../src/Pages/user/Login'
import UserForgotPassword from '../src/Pages/user/ForgotPassword'
import Category from './Pages/Admin/category/Category'
import UpdateCategory from './Pages/Admin/category/UpdateCategory'
import RegisterComplete from '../src/Pages/user/RegisterComplete'
import AdminDashboard from '../src/Pages/Admin/dashboard/AdminDashboard'
import Sub from './Pages/Admin/subCategory/Sub'
import UpdateSub from './Pages/Admin/subCategory/UpdateSub'

import { auth } from './firebase/firebase'
import { getCurrentUser } from './functions/user'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import AboutUs from './Pages/user/AboutUs'
import ContactUs from './Pages/user/ContactUs'
import PrivacyPolicy from './Pages/user/PrivacyPolicy'
import Terms from './Pages/user/CopyRight'

import Dashboard from './Pages/seller/Dashboard'
import SellerProfile from './Pages/seller/SellerProfile'
import Rejected from './Pages/seller/product/Rejected'
import UpdateSellerProfile from './Pages/seller/UpdateSellerProfile'
import SellerProfileDashboard from './Pages/Admin/seller/SellerProfileDashboard'
import CreateProduct from './Pages/seller/product/CreateProduct'
import UpdateProduct from './Pages/seller/product/UpdateProduct'
import Products from './Pages/seller/product/Products'
import UnapprovedProduct from './Pages/Admin/product/UnapprovedProduct'
import ProductPage from './Pages/product/ProductPage'
import SellerRegistration from './Pages/seller/Registration'
import SellerRegistrationComplete from './Pages/seller/RegistrationComplete'
import Users from './Pages/Admin/users/Users'
import Doctor from './Pages/Admin/doctor/Doctor'
import Seller from './Pages/Admin/seller/Seller'
import DeactivateSeller from './Pages/Admin/seller/Deactivated'
import ActivatedSellers from './Pages/Admin/seller/Activated'
import DeactivatedUser from './Pages/Admin/users/Deactivated'
import Poster from './Pages/Admin/poster/Poster'
import ActivatedUser from './Pages/Admin/users/Activated'
import Coupon from './Pages/Admin/coupon/Coupon'
import UpdateCoupon from './Pages/Admin/coupon/UpdateCoupon'
import Agency from './Pages/Admin/agency/Agency'
import ForgotPassword from './Pages/Admin/ForgotPassword'
import SellerForgotPassword from './Pages/seller/SellerForgotPassword'
import PackageFinal from './Pages/pack/PackageFinal'
import OrderPayment from './Pages/user/payment/OrderPayment'
import AdsPayment from './Pages/seller/ads/payment/adPayment'

import Package from '../src/Pages/pack/Package'
import CreatePackage from './Pages/Admin/pack/CreatePackage'
import Wishlist from './Pages/user/Wishlist'
import Cart from './Pages/user/Cart'
import Shipping from './Pages/user/Shipping'
import UserProfile from './Pages/user/UserProfile'
import UpdateUserProfile from './Pages/user/UpdateUserProfile'
import Activate from './Pages/seller/product/Activate'
import Deactivate from './Pages/seller/product/Deactivate'
import SellerOrders from './Pages/seller/order/Orders'
import State from './Pages/Admin/state/State'
import UpdateState from './Pages/Admin/state/UpdateState'
import City from './Pages/Admin/city/City'
import UpdateCity from './Pages/Admin/city/UpdateCity'
import UpdatePackage from './Pages/Admin/pack/UpdatePackage'
import AdminProducts from './Pages/Admin/product/Product'
import Orders from './Pages/Admin/order/Orders'
import Ads from './Pages/Admin/ads/Ads'
import AdminOrderDetail from './Pages/Admin/order/OrderDetail'
import AdminComplain from './Pages/Admin/complain/Complain'

import AdminRoute from './components/auth/Admin'
import SellerRoute from './components/auth/Seller'
import AgencyRoute from './components/auth/Agency'
import DoctorRoute from './components/auth/Doctor'
import UserRoute from './components/auth/User'
import PickUp from './Pages/seller/order/PickUp'
import SellerAds from './Pages/seller/ads/Ads'

//doctor
import Registration from '../src/Pages/Doctors/Registration'
import RegistrationComplete from '../src/Pages/Doctors/RegistrationComplete'
import DoctorProfile from '../src/Pages/Doctors/DoctorProfile'
import UpdateDoctorProfile from '../src/Pages/Doctors/UpdateDoctorProfile'


import AgencyOrders from './Pages/agency/Orders'
import AgencyForgotPassword from './Pages/agency/AgencyForgotPassword'
import PickUpOrders from './Pages/agency/PickUpOrder'
import ManageOrders from './Pages/agency/MangeOrders'
import AgencyOrderDetails from './Pages/agency/OrderDetails'
import Chat from './Pages/chat/Chat'
import Complain from './Pages/user/Complain'
import ListComplain from './Pages/user/ListComplain'
import ListOrder from './Pages/user/ListOrder'
import OrderDetail from './Pages/user/OrderDetail'
import SearchFilter from './Pages/user/FilterSearch'
import PaymentSuccess from './Pages/user/PaymentSuccess'
import Code404 from './Pages/error/404'
import Chatbot from './Pages/user/Chatbot'

const App = ({ history }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [bot, setBot] = useState(false)

  useEffect(() => {

    if (user === null) {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken()
          await getCurrentUser(idToken).then(res => {
            if (res.data.role === 'seller') {
              dispatch({
                type: 'LOGIN_USER',
                payload: {
                  email: res.data.email,
                  name: res.data.name,
                  role: res.data.role,
                  token: idToken,
                  remainingDays: res.data.remainingDays,
                  package: res.data.packageId,
                  remainingProducts: res.data.remainingProducts,
                  totalProducts: res.data.totalProducts,
                  _id: res.data._id
                }
              })
              history.push('/seller/dashboard')
            } else if (res.data.role === 'user') {
              dispatch({
                type: 'LOGIN_USER',
                payload: {
                  email: res.data.email,
                  name: res.data.name,
                  role: res.data.role,
                  token: idToken,
                  address: res.data.address,
                  _id: res.data._id
                }
              })
              history.push('/user/profile')
            } else if (res.data.role === 'admin') {
              dispatch({
                type: 'LOGIN_USER',
                payload: {
                  email: res.data.email,
                  name: res.data.name,
                  role: res.data.role,
                  token: idToken,
                  address: res.data.address,
                  _id: res.data._id
                }
              })
              history.push('/admin/dashboard')
            } else if (res.data.role === 'agency') {
              dispatch({
                type: 'LOGIN_USER',
                payload: {
                  email: res.data.email,
                  name: res.data.name,
                  role: res.data.role,
                  token: idToken,
                  _id: res.data._id
                }
              })
              history.push('/admin/dashboard')
            } else if (res.data.role === 'doctor') {
              dispatch({
                role: "doctor",
                email: res.data.email,
                name: res.data.name,
                degree: res.data.degree,
                experience: res.data.experience,
                token: idToken,
                specialization: res.data.specialization,
                _id: res.data._id
              })
              history.push('/chat')
            } else {
              dispatch({
                type: 'LOGIN_USER',
                payload: {
                  role: "doctor",
                  email: res.data.email,
                  name: res.data.name,
                  degree: res.data.degree,
                  experience: res.data.experience,
                  token: idToken,
                  specialization: res.data.specialization,
                  _id: res.data._id
                }
              })
              history.push('/chat')
            }

          }).catch(err => {
            console.log(err);
          })
        }
      })
    }

  }, [dispatch, user, history])


  const handleBot = () => {
    if (bot) {
      setBot(false)
    } else {
      setBot(true)
    }
  }

  return (
    <>
      <Router>
        {((user && user.role === "admin") || (user && user.role === "seller") || (user && user.role === "agency") || (user && user.role === "doctor")) ? '' : <Header />}
        {user && user.role === "doctor" && <DoctorHeader />}
        <Switch>
          {/* others */}
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/page/:pageNumber' component={Home}></Route>
          <Route exact path='/aboutUs' component={AboutUs}></Route>
          <Route exact path='/contactUs' component={ContactUs}></Route>
          <Route exact path='/privacyPolicy' component={PrivacyPolicy}></Route>
          <Route exact path='/termsConditions' component={Terms}></Route>
          <Route exact path='/product/find' component={SearchFilter}></Route>
          <Route exact path='/product/:id' component={ProductPage}></Route>
          <Route exact path='/package' component={Package}></Route>
          {/* common */}
          <Route exact path="/chat" component={Chat}></Route>
          <Route exact path='/login' component={Login}></Route>
          {/*user routes*/}
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/registration/complete' component={RegisterComplete}></Route>
          <Route exact path='/user/wishlist' component={Wishlist}></Route>
          <UserRoute exact path='/user/profile' component={UserProfile}></UserRoute>
          <UserRoute exact path='/update/user/profile' component={UpdateUserProfile}></UserRoute>
          <Route exact path='/user/cart' component={Cart}></Route>
          <UserRoute exact path='/user/shipping' component={Shipping}></UserRoute>
          <UserRoute exact path='/user/make/complain/:id' component={Complain}></UserRoute>
          <UserRoute exact path='/user/list/complain' component={ListComplain}></UserRoute>
          <UserRoute exact path='/user/order' component={ListOrder}></UserRoute>
          <UserRoute exact path='/user/order/:id/:status' component={OrderDetail}></UserRoute>
          <UserRoute exact path='/user/:id/success' component={PaymentSuccess}></UserRoute>
          <UserRoute exact path='/payment/order' component={OrderPayment}></UserRoute>
          <Route exact path='/change/password' component={UserForgotPassword}></Route>

          {/*doctor routes*/}
          <Route exact path='/doctor/registration' component={Registration}></Route>
          <Route exact path='/doctor/registration/complete' component={RegistrationComplete}></Route>
          <DoctorRoute exact path='/doctor/profile' component={DoctorProfile}></DoctorRoute>
          <DoctorRoute exact path='/doctor/update/profile' component={UpdateDoctorProfile}></DoctorRoute>
          {/*seller routes*/}
          <Route exact path='/seller/registration' component={SellerRegistration} />
          <Route exact path='/seller/registration/complete' component={SellerRegistrationComplete} />
          <Route exact path='/payment/package' component={PackageFinal}></Route>
          <SellerRoute exact path='/seller/profile' component={SellerProfile} />
          <SellerRoute exact path='/seller/update/profile' component={UpdateSellerProfile} />
          <SellerRoute exact path='/seller/product' component={CreateProduct} />
          <SellerRoute exact path='/seller/products' component={Products} />
          <SellerRoute exact path='/seller/product/:id' component={UpdateProduct} />
          <SellerRoute exact path='/seller/dashboard' component={Dashboard} />
          <SellerRoute exact path='/seller/products/activate' component={Activate} />
          <SellerRoute exact path='/seller/products/deactivate' component={Deactivate} />
          <SellerRoute exact path='/seller/products/rejected' component={Rejected} />
          <SellerRoute exact path='/seller/orders/pickup/:pageNumber' component={PickUp} />
          <SellerRoute exact path='/seller/orders/:pageNumber' component={SellerOrders} />
          <SellerRoute exact path='/seller/ads/:pageNumber' component={SellerAds} />
          <SellerRoute exact path='/seller/change/password' component={SellerForgotPassword} />
          <SellerRoute exact path='/payment/ads/:id' component={AdsPayment}></SellerRoute>
          {/*admin routes*/}
          <AdminRoute exact path='/admin/category/:id' component={UpdateCategory} />
          <AdminRoute exact path='/admin/category' component={Category} />
          <AdminRoute exact path='/admin/sub' component={Sub} />
          <AdminRoute exact path='/admin/sub/:id' component={UpdateSub} />
          <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
          <AdminRoute exact path='/admin/product/unapproved' component={UnapprovedProduct} />
          <AdminRoute exact path='/admin/product/:pageNumber' component={AdminProducts} />
          <AdminRoute exact path='/admin/states' component={State} />
          <AdminRoute exact path='/admin/state/:id' component={UpdateState} />
          <AdminRoute exact path='/admin/cities' component={City} />
          <AdminRoute exact path='/admin/city/:id' component={UpdateCity} />
          <AdminRoute exact path='/admin/users/:pageNumber' component={Users} />
          <AdminRoute exact path='/admin/user/deactivated' component={DeactivatedUser} />
          <AdminRoute exact path='/admin/user/activated' component={ActivatedUser} />
          <AdminRoute exact path='/admin/sellers/:pageNumber' component={Seller} />
          <AdminRoute exact path='/admin/seller/deactivated' component={DeactivateSeller} />
          <AdminRoute exact path='/admin/seller/activated' component={ActivatedSellers} />
          <AdminRoute exact path='/admin/seller/:id' component={SellerProfileDashboard} />
          <AdminRoute exact path='/admin/doctor/:pageNumber' component={Doctor} />
          <AdminRoute exact path='/admin/coupon' component={Coupon} />
          <AdminRoute exact path='/admin/coupon/:id' component={UpdateCoupon} />
          <AdminRoute exact path='/admin/package' component={CreatePackage} />
          <AdminRoute exact path='/admin/package/:id' component={UpdatePackage} />
          <AdminRoute exact path='/admin/orders/:pageNumber' component={Orders} />
          <AdminRoute exact path='/admin/:id/detail' component={AdminOrderDetail} />
          <AdminRoute exact path='/admin/ads/:pageNumber' component={Ads} />
          <AdminRoute exact path='/admin/shipping/agency' component={Agency} />
          <AdminRoute exact path='/admin/change/password' component={ForgotPassword} />
          <AdminRoute exact path='/admin/complain' component={AdminComplain} />
          <AdminRoute exact path='/admin/poster' component={Poster} />
          {/* Agency routes */}
          <AgencyRoute exact path='/agency/:pageNumber' component={AgencyOrders} />
          <AgencyRoute exact path='/agency/order/detail/:id' component={AgencyOrderDetails} />
          <AgencyRoute exact path='/agency/pickup/:pageNumber' component={PickUpOrders} />
          <AgencyRoute exact path='/agency/manage/:pageNumber' component={ManageOrders} />
          <AgencyRoute exact path='/agency/change/password' component={AgencyForgotPassword} />

          <Route component={Code404} />
        </Switch>
        {((user && user.role === "admin") || (user && user.role === "seller") || (user && user.role === "agency") || (user && user.role === "doctor")) ? '' : <Footer />}
        {bot && <Chatbot className="chatbot-close" />}
        <button className="open-button" onClick={() => handleBot()}><i class="far fa-comment-alt"></i></button>
      </Router>

    </>
  )
}

export default App


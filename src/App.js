import Header from './components/nav/Header'
import { Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Home from '../src/Pages/user/Home'
import Register from '../src/Pages/user/Register'
import Login from '../src/Pages/user/Login'
import Category from './Pages/Admin/category/Category'
import UpdateCategory from './Pages/Admin/category/UpdateCategory'
import RegisterComplete from '../src/Pages/user/RegisterComplete'
import ForgotPassword from './Pages/ForgotPassword'
import AdminDashboard from '../src/Pages/Admin/dashboard/AdminDashboard'
import Sub from './Pages/Admin/subCategory/Sub'
import UpdateSub from './Pages/Admin/subCategory/UpdateSub'

import { auth } from './firebase/firebase'
import { getCurrentUser } from './functions/user'

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './Pages/seller/Dashboard'
import CreateProduct from './Pages/seller/product/CreateProduct'
import UpdateProduct from './Pages/seller/product/UpdateProduct'
import Products from './Pages/seller/product/Products'
import UnapprovedProduct from './Pages/Admin/product/UnapprovedProduct'
import ProductDetails from './Pages/product/ProductDetails'
import SellerRegistration from './Pages/seller/Registration'
import SellerRegistrationComplete from './Pages/seller/RegistrationComplete'
import Users from './Pages/Admin/users/Users'
import Seller from './Pages/Admin/seller/Seller'
import DeactivateSeller from './Pages/Admin/seller/Deactivated'
import ActivatedSellers from './Pages/Admin/seller/Activated'
import DeactivatedUser from './Pages/Admin/users/Deactivated'
import ActivatedUser from './Pages/Admin/users/Activated'
import Coupon from './Pages/Admin/coupon/Coupon'
import UpdateCoupon from './Pages/Admin/coupon/UpdateCoupon'
import Chart from './Pages/Admin/Chart/Chart'
import Agency from './Pages/Admin/agency/Agency'


import { getProducts, getSellerProducts } from './functions/product'
import Package from '../src/Pages/pack/Package'
import CreatePackage from './Pages/Admin/pack/CreatePackage'
import Wishlist from './Pages/user/Wishlist'
import Cart from './Pages/user/Cart'
import Activate from './Pages/seller/product/Activate'
import Deactivate from './Pages/seller/product/Deactivate'
import State from './Pages/Admin/state/State'
import UpdateState from './Pages/Admin/state/UpdateState'
import City from './Pages/Admin/city/City'
import UpdateCity from './Pages/Admin/city/UpdateCity'
import UpdatePackage from './Pages/Admin/pack/UpdatePackage'
import AdminProducts from './Pages/Admin/product/Product'
import Orders from './Pages/Admin/order/Orders'
import Ads from './Pages/Admin/ads/Ads'

import AdminRoute from './components/auth/Admin'
import SellerRoute from './components/auth/Seller'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const setState = auth.onAuthStateChanged(async (user) => {
      if (user) {

        const idToken = await user.getIdToken()
        await getCurrentUser(idToken).then(res => {

          if (res.data.role === 'seller') {

            dispatch({
              type: 'SET_SELLER',
              payload: {
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                token: idToken,
                remainingDays: res.data.remainingDays,
                package: res.data.package,
                remainingProducts: res.data.remainingProducts,
                totalProducts: res.data.totalProducts,
                cart: res.data.cart,
                wishlist: res.data.wishlist,
                _id: res.data._id
              }
            })
            getSellerProducts(res.data._id, idToken).then(res => {
              dispatch({
                type: 'SET_SELLER_PRODUCTS',
                payload: res.data
              })
            })
          } else {
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
          }

        }).catch(err => {
          console.log(err);
        })
      }
    })
    getProducts().then(res => {
      dispatch({
        type: 'SET_PRODUCTS',
        payload: res.data
      })
    })
    return () => setState()
  }, [dispatch])

  return (
    <>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/register' exact component={Register}></Route>
          <Route path='/registration/complete' exact component={RegisterComplete}></Route>
          {/*user routes*/}
          <Route path='/user/wishlist' exact component={Wishlist}></Route>
          <Route path='/user/cart' exact component={Cart}></Route>

          {/* other */}
          <Route path='/change/password' exact component={ForgotPassword}></Route>
          <Route path='/product/:id' exact component={ProductDetails}></Route>

          {/*admin routes*/}
          <AdminRoute path='/admin/category/:id' exact component={UpdateCategory} />
          <AdminRoute path='/admin/category' exact component={Category} />
          <AdminRoute path='/admin/sub/' exact component={Sub} />
          <AdminRoute path='/admin/sub/:id' exact component={UpdateSub} />
          <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
          <AdminRoute path='/admin/product' exact component={AdminProducts} />
          <AdminRoute path='/admin/product/unapproved' exact component={UnapprovedProduct} />
          <AdminRoute path='/admin/states' exact component={State} />
          <AdminRoute path='/admin/state/:id' exact component={UpdateState} />
          <AdminRoute path='/admin/cities' exact component={City} />
          <AdminRoute path='/admin/city/:id' exact component={UpdateCity} />
          <AdminRoute path='/admin/users' exact component={Users} />
          <AdminRoute path='/admin/user/deactivated' exact component={DeactivatedUser} />
          <AdminRoute path='/admin/user/activated' exact component={ActivatedUser} />
          <AdminRoute path='/admin/sellers' exact component={Seller} />
          <AdminRoute path='/admin/seller/deactivated' exact component={DeactivateSeller} />
          <AdminRoute path='/admin/seller/activated' exact component={ActivatedSellers} />
          <AdminRoute path='/admin/coupon' exact component={Coupon} />
          <AdminRoute path='/admin/coupon/:id' exact component={UpdateCoupon} />
          <AdminRoute path='/admin/package' exact component={CreatePackage} />
          <AdminRoute path='/admin/package/:id' exact component={UpdatePackage} />
          <AdminRoute path='/admin/orders' exact component={Orders} />
          <AdminRoute path='/admin/ads' exact component={Ads} />
          <AdminRoute path='/admin/shipping/agency' exact component={Agency} />


          {/*seller routes*/}
          <SellerRoute path='/seller/registration' exact component={SellerRegistration} />
          <SellerRoute path='/seller/registration/complete' exact component={SellerRegistrationComplete} />
          <SellerRoute path='/seller/product' exact component={CreateProduct} />
          <SellerRoute path='/seller/products' exact component={Products} />
          <SellerRoute path='/seller/product/:id' exact component={UpdateProduct} />
          <SellerRoute path='/seller/dashboard' exact component={Dashboard} />
          <SellerRoute path='/seller/products/activate' exact component={Activate} />
          <SellerRoute path='/seller/products/deactivate' exact component={Deactivate} />

          {/* for testing */}
          <Route path='/package' exact component={Package}></Route>
          <Route path='/chart' exact component={Chart}></Route>

        </Switch>
      </Router>
    </>
  )
}

export default App


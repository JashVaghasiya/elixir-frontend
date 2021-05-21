import React, { useEffect, useState } from 'react'
import { listWishlist, removeWishlist } from '../../functions/wishlist'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import WishlistCard from '../../components/cards/WishlistCard';
import '../../css/Wishlist.css'
import EmptyWishlist from '../../images/wishlist.gif'
import Loader from '../../components/Loader'

const Wishlist = () => {

    const user = useSelector(state => state.user)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (user && user._id) {
            getWishlist()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, product])

    const getWishlist = async () => {
        setLoading(true)
        await listWishlist(user && user.token).then(res => {
            setProducts(res.data);
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    const removeProduct = async (id) => {
        await removeWishlist(id, user && user._id, user && user.token).then(res => {
            if (res) {
                getWishlist()
                setProduct(true)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="wishlist-container" style={{ background: "#fafbfc" }}>

            {loading ? <Loader /> : products.wishlist && products.wishlist.length === 0 ?
                <div className="empty-wishlist">
                    <Image style={{ width: "400px", height: "300px" }} src={EmptyWishlist} alt="Empty-Cart" />
                    <h2 className="empty-text">Your Wishlist is Empty!</h2>
                    <Link to="/" className="form-button my-3">Go Back</Link>
                </div>
                :
                <>
                    <h1 className="page-heading mt-4">WISHLIST</h1>
                    <div className="product-wrapper">
                        {products.wishlist && products.wishlist.length > 0 && products.wishlist.map(p => (
                            <WishlistCard key={p._id} product={p} remove={removeProduct} />
                        ))}
                    </div>
                </>
            }

        </div>
    )
}

export default Wishlist

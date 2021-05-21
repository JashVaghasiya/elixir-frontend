import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UploadImage from '../../../components/UploadImage'
import Avatar from 'antd/lib/avatar/avatar'
import Veg from '../../../images/veg.png'
import NonVeg from '../../../images/non-veg.png'
import { getProduct, updateProduct } from '../../../functions/product'
import SideNav from '../../../components/nav/Seller'
import '../../../css/CreateProduct.css'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

const UpdateProduct = ({ match, history }) => {

    const sellerInfo = useSelector(state => state.user)

    //infos
    const [seller, setSeller] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [images, setImages] = useState([])
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()
    const [subs, setSubs] = useState([])
    const [reviews, setReviews] = useState([])
    const [price, setPrice] = useState()
    const [type, setType] = useState('')
    const [stock, setStock] = useState()
    const [form, setForm] = useState('')
    const [qtyPerPack, setQty] = useState('')
    const [error, setError] = useState(null)

    // eslint-disable-next-line no-unused-vars
    const [uploadedFile, setUploadedFile] = useState([])

    useEffect(() => {
        loadProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadProduct = async () => {
        await getProduct(match.params.id).then(res => {
            setUploadedFile(res.data.images)
            setSubs(res.data.subs)
            setCategory(res.data.category)
            setSeller(res.data.seller)
            setName(res.data.name)
            setDescription(res.data.description)
            setImages(res.data.images)
            setBrand(res.data.brand)
            setPrice(res.data.price)
            setType(res.data.type)
            setStock(res.data.stock)
            setReviews(res.data.reviews)
            setForm(res.data.form)
            setQty(res.data.qtyPerPack)
        }).catch(err => {
            console.log(err);
        })
    }




    const submitHandler = async () => {

        const data = { seller, name, description, type, form, images, brand, category, subs, price, stock, reviews }

        if (seller.remainingProducts > 0) {
            if (name === null || qtyPerPack === null || form === null || description === null || brand === null) {
                return setError("Fill the Empty fields!")
            } else if (images.length <= 0) {
                return setError("Select Images!")
            } else if (price <= 0) {
                return setError("Enter Valid Price it should be greater than ZERO!")
            } else if (stock <= 0) {
                return setError("Enter Valid Stock value, it should be greater than ZERO!")
            } else {
                await updateProduct(match.params.id, data, sellerInfo.token).then(res => {
                    setCategory('')
                    setUploadedFile([])
                    setPrice('')
                    setType('')
                    setStock('')
                    setName('')
                    setForm('')
                    setDescription('')
                    setBrand('')
                    setSubs([])
                    history.push("/seller/products")
                }).catch(err => {
                    console.log("Creating Updating Product Error:", err);
                })
            }
        } else {
            setError("Renew Your Package !")
        }

    }
    return (
        <div id="body">
            <div className="container-main">
                <SideNav />
                <main>
                    <div className="main__container">
                        <Link className="create-button" to="/seller/product">Go Back</Link>
                        <div style={{ marginTop: "20px" }}>
                            <UploadImage update="update" uploadedFile={images} setUploadedFile={setImages} />
                        </div>
                        <div class="content-product " style={{ display: "block", width: "50%" }}>
                            <label className="text-white float-left mt-2">Name</label>
                            <input className="create-input" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Product Name" />
                            <label className="text-white float-left mt-2">Description</label>
                            <textarea rows={4} className='create-text-area' value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" ></textarea>

                            <div style={{ display: "flex" }} className="mt-2 text-white">
                                <label className="text-white">Type:</label>
                                <input type="radio" className="create-radio" checked={type === "Veg"} name="type" value='Veg' onChange={e => setType(e.target.value)} /><Avatar shape="square" size={30} src={Veg} className="mr-2" /> Vegetarian
                                <input type="radio" className="create-radio" name="type" checked={type === "Non-Veg"} value='Non-Veg' onChange={e => setType(e.target.value)} /><Avatar shape="square" size={30} src={NonVeg} className="mr-2" /> Non-Vegetarian
                            </div>

                            <div style={{ display: "flex" }} className="mt-2 text-white">
                                <label className="mr-3">Form:</label>
                                <input className="create-radio" type="radio" name="form" checked={form === "Syrup"} value='Syrup' onClick={e => setForm(e.target.value)} />Syrup
                                    <input className="create-radio" type="radio" name="form" checked={form === "Tablet"} value='Tablet' onClick={e => setForm(e.target.value)} />Tablets
                                    <input className="create-radio" type="radio" name="form" checked={form === "Capsules"} value='Capsules' onClick={e => setForm(e.target.value)} />Capsules
                                    <input className="create-radio" type="radio" name="form" checked={form === "Drops"} value='Drops' onClick={e => setForm(e.target.value)} />Drops
                                </div>

                            <label className="text-white float-left mt-2">Quantity Per Pack</label>
                            <input className="create-input" value={qtyPerPack} onChange={e => setQty(e.target.value)} placeholder="Enter Qty Per Pack" />
                            <label className="text-white float-left mt-2">Brand Name</label>
                            <input className="create-input" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enter Brand" />
                            <label className="text-white float-left mt-2">Price</label>
                            <input className="create-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" />
                            <label className="text-white float-left mt-2">Stock</label>
                            <input className="create-input" value={stock} onChange={e => setStock(e.target.value)} placeholder="Enter Quantity" />
                            {error !== null && <Alert className="mt-3 mb-3 text-white" variant="dark">{error}</Alert>}
                            <button className='create-button my-3 float-left' onClick={submitHandler}>Update</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UpdateProduct
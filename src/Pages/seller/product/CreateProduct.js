import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import SideNav from '../../../components/nav/Seller'
import { getCategories } from '../../../functions/category'
import UploadImage from '../../../components/UploadImage'
import { getSubsOfCategory } from '../../../functions/subCategory'
import Avatar from 'antd/lib/avatar/avatar'
import Veg from '../../../images/veg.png'
import NonVeg from '../../../images/non-veg.png'
import { createProduct } from '../../../functions/product'
import ProductHeader from '../header/ProductHeader'
import SellerHeader from '../../../components/nav/HeaderMain'
import '../../../css/CreateProduct.css'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

const CreateProduct = ({ history }) => {

    const seller = useSelector(state => state.user)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [uploadedFile, setUploadedFile] = useState([])
    const [images, setImages] = useState(uploadedFile)
    const [brand, setBrand] = useState(null)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [subs, setSubs] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [price, setPrice] = useState(null)
    const [type, setType] = useState('Veg')
    const [form, setForm] = useState('Syrup')
    const [qtyPerPack, setQty] = useState(null)
    const [stock, setStock] = useState(null)
    const [submit, setSubmit] = useState(true)

    const [error, setError] = useState(null)


    useEffect(() => {
        loadCategory()
    }, [seller])


    const loadCategory = async () => {
        await getCategories().then(res => {
            setCategories(res.data)
        })
    }

    const loadSubCategory = async value => {
        await getSubsOfCategory(value).then(res => {
            setSubCategories(res.data)
        })
    }
    const setAll = (e) => {
        setCategory(e.target.value)
        loadSubCategory(e.target.value)
    }

    const submitHandler = async () => {


        setImages(uploadedFile)

        let data = { name, seller: seller._id, qtyPerPack, form, description, type, images, brand, category, subs, price, stock }

        if (seller.remainingProducts > 0) {
            if (name === null || qtyPerPack === null || form === null || description === null || brand === null) {
                return setError("Fill the Empty fields!")
            } else if (images.length <= 0) {
                return setError("Select Images!")
            } else if (category == null) {
                return setError("Select Category!")
            } else if (subs.length <= 0) {
                return setError("Select Sub-Categories!")
            } else if (price <= 10) {
                return setError("Enter Valid Price it should be greater than Ten!")
            } else if (stock <= 1) {
                return setError("Enter Valid Stock value, it should be greater than One!")
            } else {
                await createProduct(data, seller.token).then(res => {
                    setCategory(null)
                    setImages([])
                    setPrice(null)
                    setType(null)
                    setStock(null)
                    setName(null)
                    setDescription(null)
                    setBrand(null)
                    setSubs([])
                    history.push("/seller/products")
                }).catch(err => {
                    console.log("Creating Product Error:", err);
                })
            }
        } else {
            setError("Renew Your Package!")
        }
    }

    return (
        <div id="body">
            <div className="container-main">
                <SellerHeader />
                <SideNav active="product" />
                <main>
                    <div className="main__container">

                        <ProductHeader activated="createProduct" />

                        {seller && seller.remainingDays > 0 ?
                            <>
                                <div style={{ marginTop: "20px" }}>
                                    <UploadImage uploadedFile={images} setUploadedFile={setImages} setSubmit={setSubmit} />
                                </div>
                                <div class="content-product" style={{ display: "block", width: "50%" }}>
                                    <label className="text-white float-left mt-2">Name</label>
                                    <input className="create-input" placeholder="Enter Product Name" maxlength="80" type="text" value={name} onChange={e => setName(e.target.value)} />
                                    <label className="text-white float-left mt-2">Description</label>
                                    <textarea className="create-text-area" rows='4' value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description"></textarea>
                                    <div style={{ display: "flex" }} className="mt-2 text-white">
                                        <label className='mr-3'>Type:</label>
                                        <input className="create-radio" checked type="radio" name="type" value='Veg' onClick={e => setType(e.target.value)} /><Avatar shape="square" size={25} src={Veg} className="mr-2" /> Vegetarian
                                        <input className="create-radio" type="radio" name="type" value='Non-Veg' onClick={e => setType(e.target.value)} /><Avatar shape="square" size={25} src={NonVeg} className="mr-2" /> Non-Vegetarian
                                    </div>
                                    <div style={{ display: "flex" }} className="mt-2 text-white">
                                        <label className="mr-3">Form:</label>
                                        <input className="create-radio" checked type="radio" name="form" value='Syrup' onClick={e => setForm(e.target.value)} />Syrup
                                        <input className="create-radio" type="radio" name="form" value='Tablet' onClick={e => setForm(e.target.value)} />Tablets
                                        <input className="create-radio" type="radio" name="form" value='Capsules' onClick={e => setForm(e.target.value)} />Capsules
                                        <input className="create-radio" type="radio" name="form" value='Drops' onClick={e => setForm(e.target.value)} />Drops
                                        <input className="create-radio" type="radio" name="form" value='Liquid' onClick={e => setForm(e.target.value)} />Liquid
                                        <input className="create-radio" type="radio" name="form" value='Cream' onClick={e => setForm(e.target.value)} />Cream
                                        <input className="create-radio" type="radio" name="form" value='Other' onClick={e => setForm(e.target.value)} />Other
                                    </div>
                                    <label className="text-white float-left mt-2">Quantity Per Pack</label>
                                    <input className="create-input" placeholder="Enter Qty Per Pack  Eg. 50 ml/50 tablets/50 capsules/10 gm" type="text" value={qtyPerPack} onChange={e => setQty(e.target.value)} />
                                    <label className="text-white float-left mt-2">Brand Name</label>
                                    <input className="create-input" type="text" placeholder="Enter Brand Name" value={brand} onChange={e => setBrand(e.target.value)} />
                                    <label className="text-white float-left mt-2">Category</label>
                                    <select className="create-select" onChange={e => setAll(e)}>
                                        <option select="true">Select Category</option>
                                        {
                                            categories.length > 0 ? categories.map(c => (
                                                <option key={c._id} value={c._id}>{c.name}</option>
                                            )) : ''
                                        }
                                    </select>
                                    {subCategories.length > 0 ?
                                        <>
                                            <label className="text-white float-left mt-2">Sub-Category</label>
                                            <Select className="float-left" mode="multiple" placeholder="Select Sub Category" value={subs} onChange={value => setSubs(value)} style={{ width: '100%' }}>
                                                {subCategories.length > 0 ? subCategories.map(c => (
                                                    <Select.Option key={c._id} multiple value={c._id}>{c.name}</Select.Option>
                                                )) : ''
                                                }
                                            </Select></> : ''

                                    }
                                    <label className="text-white float-left mt-2">Price</label>
                                    <input className="create-input" type="number" value={price} placeholder="Enter Price" min={0} onChange={e => setPrice(e.target.value)} />
                                    <label className="text-white float-left mt-2">Stock</label>
                                    <input className="create-input" type="number" value={stock} placeholder="Enter Available Stock" min={0} onChange={e => setStock(e.target.value)} />
                                    {error !== null && <Alert className="mt-3 mb-3 text-white" variant="dark">{error}</Alert>}
                                    <button className="create-button float-left my-3" onClick={() => submitHandler()} size="large" type="primary" disabled={submit}>Add Product</button>
                                </div>
                            </>
                            :
                            <Alert variant="dark">Your Package has been expired! <Link className="red-link" to="/package"> Renew</Link></Alert>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreateProduct
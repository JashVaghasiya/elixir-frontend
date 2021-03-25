import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Radio } from 'antd'
import UploadImage from '../../../components/UploadImage'
import Avatar from 'antd/lib/avatar/avatar'
import Veg from '../../../images/veg.png'
import NonVeg from '../../../images/non-veg.png'
import { getProduct, updateProduct } from '../../../functions/product'
import SideNav from '../../../components/nav/SellerSideNav'

const UpdateProduct = ({ match, history }) => {

    const dispatch = useDispatch()
    const sellerInfo = useSelector(state => state.seller)
    const sellerProducts = useSelector(state => state.products)

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

    //images
    const [uploadedFile, setUploadedFile] = useState([])


    //setting product
    const [products, setProducts] = useState()




    useEffect(() => {
        loadProduct()
        setProducts(sellerProducts)
    }, [])

    const loadProduct = () => {
        getProduct(match.params.id).then(res => {
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

        const data = { seller, name, description, type, images, brand, category, subs, price, stock, reviews }

        await updateProduct(match.params.id, data, sellerInfo.token).then(res => {
            setCategory('')
            setUploadedFile([])
            setPrice('')
            setType('')
            setStock('')
            setName('')
            setDescription('')
            setBrand('')
            setSubs([])
            dispatch({
                type: 'UPDATE_SELLER_PRODUCT',
                payload: {
                    ...products, data
                }
            })
            history.push("/seller/products")
        }).catch(err => {
            console.log("Creating Updating Product Error:", err);
        })

    }
    return (
        <div>
            <SideNav />
            <div className="page-content">
                <h2>Update Product</h2>
                <UploadImage update="update" uploadedFile={images} setUploadedFile={setImages} />
                <Input className='form-control mt-2' value={name} onChange={e => setName(e.target.value)} placeholder="Enter Product Name" />
                <Input.TextArea rows={4} className='form-control mt-2' value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" />
                <label className='mr-2'>Type:</label>
                <Radio.Group defaultValue={type === "Veg" ? "Non-Veg" : "Veg"} className="mt-2" onChange={e => setType(e.target.value)}>
                    <Radio value='Veg' ><Avatar shape="square" size={30} src={Veg} /> Vegetarian</Radio>
                    <Radio value='Non-Veg'><Avatar shape="square" size={30} src={NonVeg} /> Non-Vegetarian</Radio>
                </Radio.Group>
                <br />
                <Input className='form-control mt-2' value={qtyPerPack} onChange={e => setQty(e.target.value)} placeholder="Enter Qty Per Pack" />
                <Input className='form-control mt-2' value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enter Brand" />
                <Input className='form-control mt-2' value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" />
                <Input className='form-control mt-2' value={stock} onChange={e => setStock(e.target.value)} placeholder="Enter Quantity" />
                <Button className='mt-3' onClick={submitHandler} size="large" type="primary">Update</Button>
            </div>
        </div>
    )
}

export default UpdateProduct
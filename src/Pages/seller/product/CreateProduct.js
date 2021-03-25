import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Radio, Select } from 'antd'
import SideNav from '../../../components/nav/SellerSideNav'
import { getCategories } from '../../../functions/category'
import UploadImage from '../../../components/UploadImage'
import { getSubsOfCategory } from '../../../functions/subCategory'
import Avatar from 'antd/lib/avatar/avatar'
import Veg from '../../../images/veg.png'
import NonVeg from '../../../images/non-veg.png'
import { createProduct } from '../../../functions/product'

const CreateProduct = ({ history }) => {

    const dispatch = useDispatch()
    const seller = useSelector(state => state.seller)
    const products = useSelector(state => state.products)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [uploadedFile, setUploadedFile] = useState([])
    const [images, setImages] = useState(uploadedFile)
    const [brand, setBrand] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [subs, setSubs] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [price, setPrice] = useState('')
    const [type, setType] = useState('Veg')
    const [form, setForm] = useState('syrup')
    const [qtyPerPack, setQty] = useState('')
    const [stock, setStock] = useState('')


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
            await createProduct(data, seller.token).then(res => {
                setCategory('')
                setImages([])
                setPrice('')
                setType('')
                setStock('')
                setName('')
                setDescription('')
                setBrand('')
                setSubs([])

                dispatch({
                    type: 'CREATE_SELLER_PRODUCT',
                    payload: { ...products, data }
                })
                history.push("/seller/products")
            }).catch(err => {
                console.log("Creating Product Error:", err);
            })
        }
    }

    return (
        <div>
            <SideNav />
            <div className="page-content">
                <h2>Create Product</h2>
                <UploadImage uploadedFile={images} setUploadedFile={setImages} />
                <Input className='form-control mt-2' value={name} onChange={e => setName(e.target.value)} placeholder="Enter Product Name" />
                <Input.TextArea rows={4} className='form-control mt-2' value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" />
                <label className='mr-2'>Type:</label>
                <Radio.Group defaultValue="Veg" className="mt-2" onChange={e => setType(e.target.value)}>
                    <Radio value='Veg'><Avatar shape="square" size={25} src={Veg} /> Vegetarian</Radio>
                    <Radio value='Non-Veg'><Avatar shape="square" size={25} src={NonVeg} /> Non-Vegetarian</Radio>
                </Radio.Group>
                <br />
                <label className='mr-2'>Form:</label>
                <Radio.Group defaultValue="syrup" className="mt-2" onChange={e => setForm(e.target.value)}>
                    <Radio value='syrup'>Syrup</Radio>
                    <Radio value='tablet'>Tablets</Radio>
                    <Radio value='capsules'>Capsules</Radio>
                    <Radio value='drops'>Drops</Radio>
                </Radio.Group>
                <Input className='form-control mt-2' value={qtyPerPack} onChange={e => setQty(e.target.value)} placeholder="Enter Qty Per Pack" />
                <Input className='form-control mt-2' value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enter Brand" />
                <select className='form-control mt-2' onChange={e => setAll(e)}>
                    <option select="true">Select Category</option>
                    {
                        categories.length > 0 ? categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        )) : ''
                    }
                </select>
                {subCategories.length > 0 ?

                    <Select mode="multiple" placeholder="Select Sub Category" value={subs} onChange={value => setSubs(value)} style={{ width: '100%' }}>
                        {subCategories.length > 0 ? subCategories.map(c => (
                            <Select.Option key={c._id} multiple value={c._id}>{c.name}</Select.Option>
                        )) : ''
                        }
                    </Select> : ''
                }
                <Input className='form-control mt-2' value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" />

                <Input className='form-control mt-2' value={stock} onChange={e => setStock(e.target.value)} placeholder="Enter Quantity" />

                <Button className='mt-3' onClick={submitHandler} size="large" type="primary">Add Product</Button>
            </div>
        </div>
    )
}

export default CreateProduct
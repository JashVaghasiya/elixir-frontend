
import { Slider } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import HomeProductCard from '../../components/cards/HomeCard'
import Loader from '../../components/Loader'
import '../../css/FilterPage.css'
import Veg from '../../images/veg.png'
import NonVeg from '../../images/non-veg.png'
import { getCategories } from '../../functions/category'
import { getCategoryViseProduct, getFilteredProducts, getSearchedProducts, getSubCategoryViseProduct } from '../../functions/product'

const FilterSearch = () => {

    const [category, setCategory] = useState([])
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [form, setForm] = useState('Syrup')
    const [selectedCat, setSelectedCat] = useState([])
    const [rating, setRating] = useState(0)
    const [type, setType] = useState('Veg')
    const location = useLocation()
    const [search, setSearch] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        getCategories().then(res => {
            setCategory(res.data)
        }).catch(error => {
            console.log(error)
        })

    }, [])

    useEffect(() => {

        if (location.search) {
            setLoading(true)
            if (location.search.startsWith("?category")) {
                getCategoryViseProduct(location.search.split('=')[1]).then(res => {
                    setProducts(res.data)
                    setSearch(true)
                    setLoading(false)
                })
            }
            if (location.search.startsWith("?subcategory")) {
                getSubCategoryViseProduct(location.search.split('=')[1]).then(res => {
                    setProducts(res.data)
                    setSearch(true)
                    setLoading(false)
                })
            }
            if (location.search.startsWith("?search")) {
                getSearchedProducts(location.search.split('=')[1]).then(res => {
                    setProducts(res.data)
                    setSearch(true)
                    setLoading(false)
                })
            }
        }
    }, [location.search])

    const putInArray = (id) => {
        const result = selectedCat.includes(id)
        console.log(result);
        if (result) {
            setSelectedCat(selectedCat.filter(c => c !== id))
        } else {
            setSelectedCat(selectedCat => [...selectedCat, id])
        }
    }

    const applyFilter = () => {
        setSearch(false)
        setLoading(true)
        getFilteredProducts({ priceRange, selectedCat, rating, form, type }).then(res => {
            setProducts(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="filter-page" style={{ background: "#e7e7e7" }}>

            <div className="side-nav">
                <h4 style={{ "color": "#fff" }}>Price</h4>
                <Slider range max={5000} min={0} defaultValue={[0, 2000]} onChange={value => setPriceRange(value)} />
                <h4 className="filter-heading">Category</h4>
                {category && category.length > 0 && category.map(c => (
                    <div>
                        <input type="checkbox" id={c._id} onChange={() => putInArray(c._id)} />
                        <label className="check-label" for={c._id}>{c.name}</label>
                    </div>
                ))}
                <h4 className="filter-heading">TYPE</h4>
                <span><input name="rdType" type="radio" value="Veg" checked onClick={e => setType(e.target.value)} /><Avatar shape="square" size={25} src={Veg} className="mr-2" /></span>
                <span><input name="rdType" type="radio" value="Non-Veg" onClick={e => setType(e.target.value)} /><Avatar shape="square" size={25} src={NonVeg} className="mr-2" /></span>
                <h4 className="filter-heading">Form</h4>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Syrup" checked onClick={e => setForm(e.target.value)} />Syrup</span>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Tablet" onClick={e => setForm(e.target.value)} />Tablet</span>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Capsule" onClick={e => setForm(e.target.value)} />Capsule</span>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Drops" onClick={e => setForm(e.target.value)} />Drops</span>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Cream" onClick={e => setForm(e.target.value)} />Cream</span>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Liquid" onClick={e => setForm(e.target.value)} />Liquid</span>
                <span style={{ display: "block" }}> <input name="rdForm" type="radio" value="Other" onClick={e => setForm(e.target.value)} />Other</span>

                <h4 className="filter-heading">Rating</h4>
                <span style={{ display: "block" }}> <input name="rdRating" type="radio" onClick={() => setRating(5)} />
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                </span>
                <span style={{ display: "block" }}> <input name="rdRating" type="radio" onClick={() => setRating(4)} />
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                </span>
                <span style={{ display: "block" }}> <input name="rdRating" type="radio" onClick={() => setRating(3)} />
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                </span>
                <span style={{ display: "block" }}> <input name="rdRating" type="radio" onClick={() => setRating(2)} />
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                </span>
                <span style={{ display: "block" }}> <input name="rdRating" type="radio" onClick={() => setRating(1)} />
                    <span>
                        <i style={{ "color": "orange" }} className='fas fa-star'></i>
                    </span>
                </span>
                <span>
                    <button className="form-button mt-3" style={{ "background": "#fff", "color": "#000", "margin-top": "10px" }} onClick={() => applyFilter()}>Apply Filters</button>
                </span>
            </div>
            <div div className="filter-content container" >
                {search && location.search.startsWith("?search") ? <h3 className="m-3">Results for "{location.search.split('=')[1]}"</h3> : ''}
                {
                    loading ? <Loader /> :
                        <div className="row center">
                            {
                                products && products.map(product => (
                                    <div key={product._id} className="mr-2 ml-2">
                                        <HomeProductCard product={product} />
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div >
    )
}

export default FilterSearch

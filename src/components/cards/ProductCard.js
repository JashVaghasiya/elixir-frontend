import React from 'react'
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import '../../css/ProductCard.css'


const ProductCard = ({ p, removeProduct, createAds, setDays }) => {


    return (
        <>
            <div class="seller-product text-center p-1" style={{ background: "#fff" }} >
                <Link to={`/product/${p._id}`}>
                    <div className="seller-product-img">
                        <img src={p.images[0].url} alt={p.images[0].name} style={{ height: "250px", padding: "10px" }} />
                    </div>

                    <h6 className="product-heading">{p.name.length > 40 ? p.name.substring(0, 40).concat("...") : p.name}</h6>
                </Link>
                <hr style={{ margin: "5px 0" }} />
                <div className="delete-edit">
                    <div className="delete">
                        <Tooltip title="Delete" color="red">
                            <DeleteOutlined className="delete-outlined" key="setting" onClick={() => removeProduct(p._id)} />
                        </Tooltip>
                    </div>
                    <div className="edit">
                        <Tooltip title="Edit" color="green">
                            <Link to={`/seller/product/${p && p._id}`}><EditOutlined tooltip="Edit" /></Link>
                        </Tooltip>
                    </div>
                </div>
                <hr style={{ margin: "5px 0" }} />
                <div className="adsSelect">
                    <select className="form-control mt-2 mb-1" style={{ background: "#efefef" }} onChange={(e) => setDays(e.target.value)}>
                        {
                            [...Array(5).keys()].map(q => (
                                <option key={q + 1} value={q + 1} >{q + 1} Days</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button className="form-button btn-block text-center" style={{ height: "45px" }} onClick={() => createAds(p)}>Apply Ads</button>
                </div>

            </div>
        </>
    )
}

export default ProductCard



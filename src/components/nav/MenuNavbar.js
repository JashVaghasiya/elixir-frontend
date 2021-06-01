import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../css/MenuNavbar.css'
import { getCategories } from '../../functions/category'
import { getSubsOfCategory } from '../../functions/subCategory'

const MenuNavbar = () => {

    const [categories, setCategories] = useState('')
    const [subs, setSubs] = useState('')
    const history = useHistory()

    useEffect(() => {
        listCategories()
    }, [])

    const listCategories = () => {
        getCategories().then(res => {
            if (res) {
                console.log(res.data)
                setCategories(res.data)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const getSubs = (id) => {
        getSubsOfCategory(id).then(res => {
            if (res) {
                setSubs(res.data)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const redirectToSearch = id => {
        history.push(`/product/find?category=${id}`)
    }



    return (
        <div className="sub-header" style={{ background: "#4a4a4a" }}>
            <div class="menu-navbar" style={{ background: "#4a4a4a", margin: "0 10px" }}>
                {categories && categories.length > 0 && categories.map(c => (
                    <>
                        <div class="menu-dropdown ml-2" onMouseEnter={() => getSubs(c._id)}>
                            <button onClick={() => redirectToSearch(c._id)} class="menu-dropbtn">{c.name} <i class="fas fa-angle-down ml-2"></i>
                            </button>
                            <div class="menu-dropdown-content">
                                {subs && subs.length > 0 && subs.map(s => (
                                    <Link key={s._id} to={`/product/find?subcategory=${s._id}`}>{s.name}</Link>
                                ))}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default MenuNavbar

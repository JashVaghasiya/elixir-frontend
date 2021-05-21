import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { deleteAgency, getAgencies, manageAgency } from '../../../functions/agency'

const Agency = () => {
    const [agency, setAgency] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [sortName, setSortName] = useState("_id")
    const [manner, setManner] = useState(1)

    useEffect(() => {
        loadSeller()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, manner, sortName])

    const loadSeller = async () => {
        setLoading(true)
        await getAgencies(sortName, manner, user && user.token).then(res => {
            setAgency(res.data.agency)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }


    const manageAgencies = async (id) => {
        await manageAgency(id, user && user.token).then(res => {
            loadSeller()
        }).catch(error => {
            console.log(error)
        })
    }
    const deleteAgencies = async (id) => {
        await deleteAgency(id, user && user.token).then(res => {
            loadSeller()
        }).catch(error => {
            console.log(error)
        })
    }

    const setSort = (name) => {
        setSortName(name)
        if (manner === 1) {
            setManner(-1)
        } else {
            setManner(1)
        }
    }

    return (
        <div id="body" >
            <div className="container-main">
                <Header />
                <AdminSideNav active="agency" />
                <main>
                    <div className="main__container">
                        <h3>Shipping Agency</h3>
                        <div className="white2"></div>
                        {
                            loading ? <Loader color="white" /> :

                                <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                    <thead>
                                        <tr>
                                            <th>Agency Id <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                                            <th>Name <i className="fas fa-sort" onClick={() => setSort("name")}></i></th>
                                            <th>Address <i className="fas fa-sort" onClick={() => setSort("address")}></i></th>
                                            <th>Email <i className="fas fa-sort" onClick={() => setSort("email")}></i></th>
                                            <th>Mobile <i className="fas fa-sort" onClick={() => setSort("mobile")}></i></th>
                                            <th>Activate/Deactivate <i className="fas fa-sort" onClick={() => setSort("mobile")}></i></th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agency && agency.length > 0 && agency.map(u => (
                                            <tr key={u._id}>
                                                <td>{u._id} </td>
                                                <td>{u.name} </td>
                                                <td>{u.address}</td>
                                                <td>{u.email}</td>
                                                <td>{u.mobile}</td>
                                                <td onClick={() => manageAgencies(u._id)}>{u.activated ? "Active" : "Deactivated"}</td>
                                                <td onClick={() => deleteAgencies(u._id)}>X</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Agency

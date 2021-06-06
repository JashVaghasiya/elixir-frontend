import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import { getAgencies } from '../../../functions/agency'

const Agency = () => {
    const [agency, setAgency] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadSeller()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const loadSeller = async () => {
        setLoading(true)
        await getAgencies(user && user.token).then(res => {
            setAgency(res.data.agency)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
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
                                            <th>Name <i className="fas fa-sort"></i></th>
                                            <th>Address <i className="fas fa-sort"></i></th>
                                            <th>Email <i className="fas fa-sort"></i></th>
                                            <th>Mobile <i className="fas fa-sort" ></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agency && agency.length > 0 && agency.map(u => (
                                            <tr key={u._id}>
                                                <td>{u.name} </td>
                                                <td>{u.address}</td>
                                                <td>{u.email}</td>
                                                <td>+{u.mobile}</td>
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

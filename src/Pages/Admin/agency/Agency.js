import React from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'

const Agency = () => {
    const [agency, setAgency] = useState([])

    return (
        <div id="body" >
            <div className="container-main">
                <Header />
                <AdminSideNav active="agency" />
                <main>
                    <div className="container-fluid">
                        <h3>Ads</h3>
                        <hr />
                        <Table striped bordered hover variant="dark" size="xm">
                            <thead>
                                <tr>
                                    <th>Agency Id</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agency.length > 0 && agency.map(u => (
                                    <tr key={u._id}>
                                        <td>{u._id}</td>
                                        <td>{u.email}</td>
                                        <td>{u.mobile}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Agency

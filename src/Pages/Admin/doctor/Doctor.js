import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import { getAdminDoctors, manageDoctor } from '../../../functions/doctor'

const Doctor = () => {

    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [sortName, setSortName] = useState("createdAt")
    const [manner, setManner] = useState(-1)
    const [doctors, setDoctors] = useState()

    useEffect(() => {
        const loadDoctors = async () => {
            setLoading(true)
            await getAdminDoctors(sortName, manner, user && user.token).then(res => {
                setDoctors(res.data)
                console.log(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err);
            })
        }
        loadDoctors()
    }, [user, manner, sortName])



    const manageDoctors = async (id, active) => {
        await manageDoctor(id, active, user && user.token).then(res => {

            if (res) {
                getAdminDoctors(sortName, manner, user && user.token).then(res => {
                    setDoctors(res.data)
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err)
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
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="doctor" />
                <main>
                    <div className="main__container">
                        <h3>Doctors</h3>
                        <div className="white2"></div>

                        {loading ? <Loader color="white" /> : <>
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th>Name<i className="fas fa-sort" onClick={() => setSort("name")}></i></th>
                                        <th>Email<i className="fas fa-sort" onClick={() => setSort("email")}></i></th>
                                        <th>Degree<i className="fas fa-sort" onClick={() => setSort("degree")}></i></th>
                                        <th>Specialization<i className="fas fa-sort" onClick={() => setSort("specialization")}></i></th>
                                        <th>Experience<i className="fas fa-sort" onClick={() => setSort("experience")}></i></th>
                                        <th>Mobile No.<i className="fas fa-sort" onClick={() => setSort("mobile")}></i></th>
                                        <th>Active/Deactivated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors && doctors.length > 0 && doctors.map(u => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{u.degree}</td>
                                            <td>{u.specialization}</td>
                                            <td>{u.experience}</td>
                                            <td>{u.mobile}</td>
                                            <td onClick={() => manageDoctors(u._id, u.isActive)}>{u.isActive ? "Click To Deactivate" : "Click To Activate"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Doctor

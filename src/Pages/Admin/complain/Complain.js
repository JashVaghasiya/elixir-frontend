import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllComplain, getItSolved } from '../../../functions/complain'
import { Table } from 'react-bootstrap';
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import Loader from '../../../components/Loader'
import '../dashboard/css/styles.css'
import { Link } from 'react-router-dom';
import { sendResolvedComplain } from '../../../functions/email';


const Complain = () => {

    const [complains, setComplains] = useState([])
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadComplains()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const loadComplains = async () => {
        setLoading(true)
        if (user && user.token) {
            await getAllComplain(user && user.token).then(res => {
                setComplains(res.data)
                console.log(res.data);
                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const makeItSolved = async (id, name) => {
        await getItSolved(id, user && user.token).then(res => {
            if (res) {
                sendResolvedComplain(user && user.name, name, user && user.email, id)
                const newComplain = complains.filter(c => c._id !== id)
                setComplains(newComplain)
            }
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div id="body">
            <div className="container-main">
                <Header />
                <AdminSideNav active="complain" />
                <main>
                    <div className="main__container">
                        <h3>Complain</h3>
                        <div className="white2"></div>
                        {loading ? <Loader color="white" /> :
                            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
                                <thead>
                                    <tr>
                                        <th >User Email</th>
                                        <th>Order Id</th>
                                        <th>ProductName</th>
                                        <th>Complain</th>
                                        <th>Solve It</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complains && complains.length > 0 && complains.map(u => (
                                        <tr key={u._id}>
                                            <td>{u.userId.email}</td>
                                            <td><Link to={`/admin/${u.orderId}/detail`}>{u.orderId}</Link></td>
                                            <td>{u.productName}</td>
                                            <td>{u.complain}</td>
                                            <td className="form-button text-center btn-block" onClick={() => makeItSolved(u._id, u.productName)}>Make It Solved</td>
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

export default Complain



import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'

const Users = () => {

  const [users, setUsers] = useState([])
  const user = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    await getUsers(user && user.token).then(res => {
      console.log(res.data)
      setUsers(res.data)
      setLoading(false)
    }).catch(error =>
      console.log('User Error--->', error)
    )
  }
  return (
    <div id="body">
      <div className="container-main">
        <Header />
        <AdminSideNav active="user" />
        <main>
          <div className="container-fluid">
            <h3>Users</h3>
            <hr />
            <Table striped bordered hover variant="dark" size="xm">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Activated or Deactivated</th>
                </tr>
              </thead>
              <tbody>
                {loading ? "Loading..." : users.length > 0 && users.map(u => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.activated ? "Active" : "Deactivated"}</td>
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

export default Users


import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/AdminSideNav'

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
    <div>

      <AdminSideNav />
      <div className="page-content">
        <h3>Users</h3>
        <hr />
        <Table striped bordered hover size="xm">
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
    </div>
  )
}

export default Users

{/* <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table> */}

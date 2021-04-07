import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUsers } from '../../../functions/user'
import AdminSideNav from '../../../components/nav/Admin'
import Header from '../../../components/nav/HeaderMain'
import UserHeader from './UserHeader'
import Paginator from '../../../components/Paginator'




const Users = ({ match }) => {

  const [users, setUsers] = useState([])
  const user = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const [sortName, setSortName] = useState('_id')
  const [manner, setManner] = useState(1)
  const [pageData, setPageData] = useState()
  // const 

  const pageNumber = match.params.pageNumber || 0

  useEffect(() => {
    loadUsers()
  }, [pageNumber, manner, sortName])

  const loadUsers = async () => {
    setLoading(true)
    await getUsers(3, pageNumber, sortName, manner, user && user.token).then(res => {
      setUsers(res.data.users)
      setPageData(res.data)
      setLoading(false)
    }).catch(error =>
      console.log('User Error--->', error)
    )
  }

  const setSort = (name) => {
    console.log("In")
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
        <AdminSideNav active="user" />
        <main>
          <div className="main__container">
            <UserHeader activated="all" />
            <h3>Users</h3>
            <div className="white2"></div>
            <Table className="mt-3" striped bordered hover variant="dark" size="xm">
              <thead>
                <tr>
                  <th>User Id <i className="fas fa-sort" onClick={() => setSort("_id")}></i></th>
                  <th>Name <i className="fas fa-sort" onClick={() => setSort("name")}></i></th>
                  <th>Email <i className="fas fa-sort" onClick={() => setSort("email")}></i></th>
                  <th>Activated or Deactivated <i className="fas fa-sort" onClick={() => setSort("activated")}></i></th>
                </tr>
              </thead>
              <tbody>
                {loading ? "Loading..." : users && users.length > 0 && users.map(u => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.activated ? "Active" : "Deactivated"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginator role="user" pages={pageData && pageData.pages} pageNumber={pageData && pageData.pageNumber} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Users


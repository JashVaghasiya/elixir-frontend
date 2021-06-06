import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { listComplains } from '../../functions/complain'
import { Container } from 'react-bootstrap'
import '../../css/ListProfile.css'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

const ListComplain = () => {

    const user = useSelector(state => state.user)
    const [complain, setComplain] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        getComplains()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getComplains = () => {
        setLoading(true)
        listComplains(user && user._id, user && user.token).then(res => {
            setLoading(false)
            setComplain(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Container className="complain-container" style={{ height: "90vh" }}>
            {loading ? <Loader /> : complain && complain.length === 0 ?
                <div className="no-complain">
                    {/* <Image style={{ width: "250px", height: "200px" }} src={EmptyComplain} alt="noComplain" /> */}
                    <i className="fas fa-exclamation-circle fa-9x text-warning"></i>
                    <h2 className="empty-text mt-4">There is no Complain!</h2>
                    <Link to="/user/make/complain" className="form-button my-3">Make Complain</Link>
                </div>
                :
                <>
                    <h2 className="my-3">Complains</h2>
                    <hr />
                    {complain && complain.length > 0 && complain.map(c =>
                        <div className="complain-div">
                            <h1>{c.productName.length > 50 ? c.productName.substr(0, 50).concat('...') : c.productName}</h1>
                            <hr />
                            <h6>Order ID: {c.orderId}</h6>
                            <p>{c.complain}</p>
                        </div>
                    )}
                    <Link to="/user/make/complain" className="form-button my-2">Make Complain</Link>
                </>
            }
        </Container>
    )
}

export default ListComplain

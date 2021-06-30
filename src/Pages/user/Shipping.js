import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStates } from '../../functions/state'
import { getCitiesOfState } from '../../functions/city'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import OrderProgressBar from './OrderProgressBar'

const UserAddress = ({ history }) => {

    const [address, setAddress] = useState('')
    const order = useSelector(state => state.order)
    const user = useSelector(state => state.user)
    const [states, setStates] = useState([])
    const [state, setState] = useState(null)
    const [cities, setCities] = useState([])
    const [city, setCity] = useState(null)
    const [flatNo, setFlatNo] = useState(null)
    const [apartmentName, setApartmentName] = useState(null)
    const [landMark, setLandmark] = useState(null)
    const [pinCode, setPinCode] = useState(null)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        loadStates()
        setAddress(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {})
        setFlatNo(address.flatNo)
        setLandmark(address.landMark)
        setPinCode(address.pinCode)
        setApartmentName(address.apartmentName)
        setCity(address.city)
        setState(address.state)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, address.city, address.state, address.pinCode, address.apartmentName, address.landMark, address.flatNo])

    const loadStates = () => {
        getStates().then(res => {
            setStates(res.data)

        }).catch(error => {
            console.log(error)
        })
        getCitiesOfState(address && address.state).then(res => {
            setCities(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const loadCity = (e) => {
        setState(e.target.value)
        getCitiesOfState(e.target.value).then(res => {
            setCities(res.data)

        }).catch(error => {
            console.log(error)
        })
    }

    const handleSubmit = () => {

        if (flatNo == null || apartmentName == null || landMark == null) {
            setError("Fill the empty fields !")
        } else if (state == null) {
            setError("Select State !")
        } else if (city == null) {
            setError("Select City !")
        } else if (pinCode.length === 0 || pinCode.length > 6 || pinCode < 0 || pinCode.length < 6) {
            setError("Enter Valid PinCode!")
        } else {
            setError(null)
            localStorage.setItem('shippingAddress', JSON.stringify({ flatNo, apartmentName, landMark, city, state, pinCode }))
            let address = "".concat(flatNo, "-", apartmentName, ",", landMark, ",", city, ",", state, "-", pinCode)
            dispatch({
                type: 'SET_ORDER',
                payload: {
                    ...order,
                    address: address
                }
            })
            history.push('/payment/order')
        }
    }

    return (
        <>
            <OrderProgressBar status="shipping" />
            <Container>
                <Row className="justify-content-md-center shipping-form">
                    <Col xs={12} md={6}>
                        <h2 className="mt-4">SHIPPING</h2>
                        <div className="mt-4">
                            <label className="float-left mt-2">House No./ Flat No.</label>
                            <input type='text' placeholder='Enter Flat No.' value={flatNo} onChange={e => setFlatNo(e.target.value)} />
                            <label className=" float-left mt-2">Society/Apartment Name</label>
                            <input type='text' placeholder='Enter Society/Apartment Name' value={apartmentName} onChange={e => setApartmentName(e.target.value)} />
                            <label className=" float-left mt-2">Land mark</label>
                            <input type='text' placeholder='Enter Landmark' value={landMark} onChange={e => setLandmark(e.target.value)} />
                            <label className="float-left mt-2">State</label>
                            <select value={state} onChange={(e) => loadCity(e)}>
                                <option>Select State</option>
                                {

                                    states.length > 0 && states.map(s => (
                                        <option key={s._id} selected={s.name === state} value={s.name}>{s.name}</option>
                                    ))
                                }
                            </select>
                            {address && state &&
                                <>
                                    <label className="float-left mt-2">City</label>
                                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                                        <option>Select City</option>
                                        {
                                            cities.length > 0 && cities.map(c => (
                                                <option selected={c.city === city} key={c._id} value={c.city}>{c.city}</option>
                                            ))
                                        }
                                    </select>
                                </>
                            }
                            <label className="float-left mt-2">Pin Code</label>
                            <input type='number' placeholder='Enter PinCode' value={pinCode} onChange={e => setPinCode(e.target.value)} />
                            {error !== null && <Alert variant="dark" className="pr-2 mt-3 text-white">{error}</Alert>}
                            <button className="form-button my-3" onClick={() => handleSubmit()}>PROCEED TO PAY</button>
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default UserAddress

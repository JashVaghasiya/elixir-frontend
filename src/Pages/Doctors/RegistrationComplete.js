import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { auth } from '../../firebase/firebase'
import { createDoctor } from '../../functions/doctor'
import { useDispatch } from 'react-redux'

const RegisterComplete = ({ history }) => {

    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [degree, setDegree] = useState(null)
    const [experience, setExperience] = useState(null)
    const [specialization, setSpecialization] = useState(null)
    const [mobileNo, setMobileNo] = useState(null)
    const [name, setName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)
    const dispatch = useDispatch()

    const url = window.location.href

    useEffect(() => {
        setEmail(window.localStorage.getItem('email'))
    }, [])

    const submitHandler = async () => {

        if (degree.length == null || name == null || specialization === null || experience === null) {
            setAlert("Fill Empty Fields!")
        } else if (mobileNo.length < 0 || mobileNo.length > 10) {
            setAlert("Enter Valid MObile No.")
        } else {
            setLoading(true)
            try {
                const result = await auth.signInWithEmailLink(email, url)
                console.log(result);
                if (result.user.emailVerified) {
                    window.localStorage.removeItem('email')

                    let user = auth.currentUser
                    await user.updatePassword(password)
                    const idToken = await user.getIdTokenResult()

                    await createDoctor(idToken.token, name, degree, Number(experience), specialization, mobileNo).then(res => {
                        console.log(res);
                        dispatch({
                            type: 'LOGIN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idToken.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        })
                        setLoading(false)
                        if (res) {
                            history.push('/chat')
                        }
                    }
                    ).catch(error => {
                        console.log("error in after signUp", error);
                    })
                }
            } catch (error) {
                console.log('error in signUp');
                console.log(error);
                setLoading(false)
            }
        }
    }

    return (
        <div className="doctor-login-container pt-5">
            <div className="container shipping-form">
                <div style={{ height: "80vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                    <h2 className="mt-5 mb-3">Complete Register</h2>
                    <label className="float-left mt-2">Enter Name</label>
                    <input size='large' className='mt-2' onChange={e => setName(e.target.value)} placeholder="Enter your Name eg. Dr. Abc" />
                    <label className="float-left mt-2">Degree</label>
                    <input size='large' className='mt-2' onChange={e => setDegree(e.target.value)} placeholder="Enter your Degree eg. M.B.B.S" />
                    <label className="float-left mt-2">Specialization</label>
                    <input size='large' className='mt-2' onChange={e => setSpecialization(e.target.value)} placeholder="Enter your Specialization eg. Child Care" />
                    <label className="float-left mt-2">Experience</label>
                    <input size='large' className='mt-2' onChange={e => setExperience(e.target.value)} placeholder="Enter your Experience" />
                    <label className="float-left mt-2">Mobile No.</label>
                    <input size='large' className='mt-2' onChange={e => setMobileNo(e.target.value)} placeholder="Enter your Mobile No" />
                    <label className="float-left mt-2">Password</label>
                    <input size='large' className='mt-2' onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                    <button onClick={() => submitHandler()} className='form-button btn-block my-4' block disabled={loading}>{loading ? "Loading..." : "Register"}</button>
                    {alert !== null && <Alert variant="dark" className="text-white">{alert}</Alert>}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete

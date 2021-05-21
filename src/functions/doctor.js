import axios from 'axios'

export const createDoctor = async (authtoken, name, degree, experience, specialization, mobileNo) => {
    console.log('calling')
    console.log(authtoken, name, degree, experience, specialization, mobileNo)
    return await axios.post('http://localhost:8000/api/doctor/register', { name, degree, experience, specialization, mobileNo }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getAdminDoctors = async (sortName, manner, authtoken) => {
    return await axios.get(`http://localhost:8000/api/admin/doctor?sortName=${sortName}&manner=${manner}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const manageDoctor = async (id, active, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/doctor/manage`, { id, active }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const getDoctorProfile = async (id, authtoken) => {
    return await axios.get(`http://localhost:8000/api/doctor/profile/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateDoctorProfile = async (data, id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/doctor/update/profile/${id}`, { data }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const updateDoctorProfilePicture = async (url, id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/doctor/update/picture`, { url, id }, {
        headers: {
            authtoken: authtoken
        }
    })
}
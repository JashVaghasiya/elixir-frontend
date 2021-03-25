import axios from 'axios'

export const createCategory = async (name, authtoken) => {
    return await axios.post('http://localhost:8000/api/category', { name }, {
        headers:
            { authtoken: authtoken }
    })
}

export const deleteCategory = async (categoryId, authtoken) => {

    return await axios.delete(`http://localhost:8000/api/category/${categoryId}`, {
        headers: { authtoken: authtoken }
    })
}

export const updateCategory = async (id, name, authtoken) => {
    return await axios.put(`http://localhost:8000/api/category/${id}`, { name }, {
        headers:
            { authtoken: authtoken }
    })
}

export const getCategories = async () => {
    return await axios.get('http://localhost:8000/api/category')
}

export const getCategory = async (id, authtoken) => {
    console.log(id, authtoken);
    return await axios.get(`http://localhost:8000/api/category/${id}`, {
        headers: {
            authtoken: authtoken
        }
    })
}
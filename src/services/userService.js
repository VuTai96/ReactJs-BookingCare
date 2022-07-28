import axios from "../axios"

const handleLogin = async (username, password) => {
    // try {
    let data = await axios.post('http://localhost:8080/api/login', {
        email: username,
        password: password
    })
    //console.log('>>data service:', data)
    return data

    // } catch (error) {
    //     console.log(error)
    // }
}
const getAllUser = (id) => {
    return axios.get(`/api/get-all-user?id=${id}`)
}
const createUser = (data) => {
    return axios.post('api/create-new-user', data)
}
const deleteUser = (data) => {
    return axios.delete('api/delete-user', { data })
}
const updateUser = (data) => {
    return axios.put('/api/edit-user', data)
}
export default handleLogin
export { getAllUser, createUser, deleteUser, updateUser }
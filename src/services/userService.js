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
    return axios.get(`/api/get-all-user?id=${id}`) //id = 'ALL' or value
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
const getAllCode = (type) => {
    return axios.get(`/api/allcode?type=${type}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
export default handleLogin
export { getAllUser, createUser, deleteUser, updateUser, getAllCode, getTopDoctorHomeService }
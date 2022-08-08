import axios from "../axios"

const handleLogin = async (username, password) => {
    let data = await axios.post('http://localhost:8080/api/login', {
        email: username,
        password: password
    })
    return data
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
const getAllDoctors = (type) => {
    return axios.get(`/api/get-all-doctors`)
}
const postDetailDoctor = (detailDoctor) => {
    return axios.post('/api/save-infor-doctor', detailDoctor)
}
const getDetailDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`)
}
const updateDetailDoctor = (data) => {
    return axios.put('/api/update-infor-doctor', data)
}

export default handleLogin
export {
    getAllUser, createUser, deleteUser, updateUser,
    getAllCode, getTopDoctorHomeService, getAllDoctors,
    postDetailDoctor, getDetailDoctor,
    updateDetailDoctor
}
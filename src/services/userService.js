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
const getAllUser = async (id) => {
    return axios.get(`/api/get-all-user?id=${id}`)
}
export default handleLogin
export { getAllUser }
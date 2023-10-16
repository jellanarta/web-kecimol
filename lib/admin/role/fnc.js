import axios from "axios";
axios.defaults.withCredentials = true

// ambil semua selain user
export const ambilUserSelainRoleUser = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/admin/role/all`)
    } catch (error) {
        return error.response
    }
}
// create role
export const adminMenambahkanRole = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/admin/role/create`, data)
    } catch (error) {
        return error.response
    }
}
// delete atau ubah jadi user
export const adminUbahROleJadiuser = async iduser => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/admin/role/${iduser}`)
    } catch (error) {
        return error.response
    }
}
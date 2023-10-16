import axios from "axios"
axios.defaults.withCredentials = true
export const userdaftar = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user/daftar`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error.response
    }
}
export const usermasuk = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user/masuk`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error.response
    }
}
export const userKeluar = async () => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/user-profil/profil/keluar`)
    } catch (error) {
        return error.response
    }
}
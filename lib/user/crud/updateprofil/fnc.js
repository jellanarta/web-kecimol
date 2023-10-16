import axios from "axios";
axios.defaults.withCredentials = true
export async function userUpdateProfil(data) {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/user-profil/profil/poto-profil`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        return error.response
    }
}
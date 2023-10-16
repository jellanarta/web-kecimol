import axios from "axios";
axios.defaults.withCredentials = true

export async function linkGantiPassword(data, type = 'link-reset-password') {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user-profil/profil/${type}`, data)
    } catch (error) {
        return error.response
    }
}
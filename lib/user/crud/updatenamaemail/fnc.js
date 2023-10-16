import axios from "axios";
axios.defaults.withCredentials = true
export async function updateNama(data, type = 'nama') {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/user-profil/profil/${type}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error.response
    }
}
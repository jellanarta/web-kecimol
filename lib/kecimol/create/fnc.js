import axios from "axios";
axios.defaults.withCredentials = true

export async function userDaftarkanKecimol(data) {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/daftarkan-kecimol`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        return error.response
    }
}
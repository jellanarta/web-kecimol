import axios from "axios";
axios.defaults.withCredentials = true

export const PublicSearchKecimol = async data => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user-public/search-kecimol?nama=${data}`)
    } catch (error) {
        return error.response
    }
}
import axios from "axios";
axios.defaults.withCredentials = true

export const userMauSewaKecimol = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user-public/sewa-kecimol`, data)
    } catch (error) {
        return error.response
    }
}
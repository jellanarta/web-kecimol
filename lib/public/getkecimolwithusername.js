import axios from "axios";
axios.defaults.withCredentials = true

export const getKecimolWithUsername = async (username, token) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/get-kecimol/${username}`, {
            headers: {
                token
            }
        })
    } catch (error) {

    }
}
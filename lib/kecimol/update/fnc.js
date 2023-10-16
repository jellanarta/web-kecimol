import axios from "axios";
axios.defaults.withCredentials = true

export const userGetKecimolWithUsername = async data => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/user-get-kecimol-to-change/${data}`)
    } catch (error) {
        return error.response
    }
}

// edit kecimol
export async function userUpdateKecimol(data, idkecimol) {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/update-kecimol/${idkecimol}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        return error.response
    }
}
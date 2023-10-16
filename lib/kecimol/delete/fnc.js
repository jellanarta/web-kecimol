import axios from "axios";
axios.defaults.withCredentials = true

export const userDeleteKecimolnya = async idkecimol => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/delete-kecimol/${idkecimol}`)
    } catch (error) {
        return error.response
    }
}

export const AdminMauHapusKecimolNiArta = async idkecimol => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/admin/delete-kecimol/${idkecimol}`)
    } catch (error) {
        return error.response
    }
}
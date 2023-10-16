import { setDikelola } from "@/redux/kelolakecimol";
import axios from "axios";
axios.defaults.withCredentials = true

// pemilik kecimol menambahkan pengelola
export async function createPengelolaKecimol(data) {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/pengelola-kecimol/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error.response
    }
}
// pemilik kecimol menghapus pengelola
export async function adminKecimolMenghapusPengelola(idpengelola, idkecimol) {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/pengelola-kecimol/delete/${idpengelola}/${idkecimol}`)
    } catch (error) {
        return error.response
    }
}


// user mengambil kecimol yang di kelola
export async function userMengambilKecimolYangDiKelola(token = null, agent = null) {
    try {
        const request = {}
        if (token && agent) {
            request.headers = {
                'authorization': token,
                'user-agent': agent
            }
        }
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/pengelola-kecimol/user`, request)
    } catch (error) {
        return error.response
    }
}
export async function userGetPengelola(dispath, stateuser, statedikelola) {
    if (dispath) {
        if (stateuser.status === "success" && stateuser.login) {
            if (statedikelola.status !== "success") {
                const hasil = await userMengambilKecimolYangDiKelola()
                const simpan = { status: 'success', dikelola: [] }
                if (hasil.status === 200) {
                    simpan.dikelola = hasil.data
                }
                dispath(setDikelola(simpan))
            }
        }
    }
}

// user menghapus undangan pengelola
export const userHapusUndanganPengelola = async data => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/pengelola-kecimol/user-delete/${data}`)
    } catch (error) {
        return error.response
    }
}
// user setujui undangan pengelola
export const userSetujuiUndangan = async data => {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/pengelola-kecimol/user-setujui-undangan`, data)
    } catch (error) {
        return error.response
    }
}
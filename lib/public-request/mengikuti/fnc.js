import { setMengikuti } from "@/redux/mengikutikecimol";
import axios from "axios";
axios.defaults.withCredentials = true

export async function userMengikutiKecimol(data) {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user-public/follow-kecimol`, data)
    } catch (error) {
        return error.response
    }
}

// mengambil yang diikuti
export async function userAmbilSemuaYangDiIkuti() {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user-public/get-diikuti`)
    } catch (error) {
        return error.response
    }
}

export async function getSemuaYangDiIkutiUser(dispatch, stateuser, statemengikuti) {
    if (dispatch) {
        if (stateuser.status === 'success' && stateuser.login) {
            if (statemengikuti.status !== "success") {
                const hasil = await userAmbilSemuaYangDiIkuti()
                const hasilakhir = { status: 'success', mengikuti: [] }
                if (hasil.status === 200) {
                    hasilakhir.mengikuti = hasil.data
                }
                dispatch(setMengikuti(hasilakhir))
            }
        }
    }
}

export const userCekMengikutiAtauTidak = (statemengikuti, idkecimol) => {
    if (statemengikuti.mengikuti.length) {
        const mengikutini = []
        statemengikuti.mengikuti.map(dt => {
            if (dt.id === idkecimol) {
                mengikutini.push(dt)
            }
        })
        if (mengikutini.length) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

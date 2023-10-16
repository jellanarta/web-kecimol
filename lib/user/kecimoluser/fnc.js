import { setKecimol } from "@/redux/kecimol";
import axios from "axios";
axios.defaults.withCredentials = true

// verifikasi user di server punya kecimol atau tidak
export const userGetAllKecimol = async (token = null, agent = null) => {
    try {
        const melaluiserver = {}
        if (token && agent) {
            melaluiserver.headers = {
                'authorization': token,
                'user-agent': agent
            }
        }
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/user-get-all-kecimol`, melaluiserver)
    } catch (error) {
        return error.response
    }
}
export const carikecimoluser = async (dispatch, stateuser, statekecimol) => {
    if (dispatch) {
        if (stateuser.status === "success") {
            if (stateuser.login) {
                if (statekecimol.status !== "success") {
                    const hasil = await userGetAllKecimol()
                    if (hasil.status === 200) {
                        dispatch(setKecimol({ status: 'success', kecimol: hasil.data }))
                    } else {
                        dispatch(setKecimol({ status: 'success', kecimol: [] }))
                    }
                }
            }
        }
    }
}
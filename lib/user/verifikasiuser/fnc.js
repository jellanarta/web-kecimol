import { logOut, setUser } from "@/redux/auth"
import axios from "axios"
import jwtDecode from "jwt-decode"
axios.defaults.withCredentials = true
export const profileUser = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user-profil/profil`)
    } catch (error) {
        return error.response
    }
}
export const verifikasiuser = async (state, dispatch, perlucek = false) => {
    if (dispatch) {
        if (perlucek) {
            const data = await profileUser()
            console.log(data);
            if (data.status === 200) {
                const token = data.data.token
                const user = jwtDecode(token)
                const datauser = { user, token, login: true }
                dispatch(setUser(datauser))
                return { login: true }
            } else {
                dispatch(logOut())
                return { login: false }
            }
        } else {
            if (state.status === "default") {
                const data = await profileUser()
                if (data.status === 200) {
                    const token = data.data.token
                    const user = jwtDecode(token)
                    const datauser = { user, token, login: true }
                    dispatch(setUser(datauser))
                    return { login: true }
                } else {
                    dispatch(logOut())
                    return { login: false }
                }
            } else {
                const { user, token, login } = state
                dispatch(setUser({ user, token, login }))
                return { login }
            }
        }
    }
}


// verifikasi user jika stateuser berubah
export const verifikasiupdatestate = (router, stateuser, admin = false, role) => {
    if (stateuser.status === "success") {
        if (!stateuser.login) {
            router.push('/masuk?ref=back')
        } else {
            if (admin) {
                if (!role.includes(stateuser.user.role)) {
                    router.push('/')
                }
            }
        }
    }
}
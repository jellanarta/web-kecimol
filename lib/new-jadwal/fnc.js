import axios from "axios";
axios.defaults.withCredentials = true

// mengambilkecimol dan yang dikelola
export const ambilkecimoldandikelola = async (token, agent) => {
    try {
        const request = {}
        if (token && agent) {
            request.headers = {
                'authorization': token,
                'user-agent': agent
            }
        }
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user/kecimol-dan-dikelola`, request)
    } catch (error) {
        return error.response
    }
}
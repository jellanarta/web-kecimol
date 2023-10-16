import { setKategoriacara } from "@/redux/kategoriacara";
import axios from "axios";
axios.defaults.withCredentials = true

// mengambil semua kategori acara
export async function SemuaOrangAmbilKategoriAcaraHakLalol() {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user-public/kategori-acara`)
    } catch (error) {
        return error.response
    }
}
// ayok ambil
export const SemuaOrangAmbilKategoriAcara = async (dispatch, stateKategoriacara) => {
    if (dispatch) {
        if (stateKategoriacara.status !== "success") {
            const hasil = await SemuaOrangAmbilKategoriAcaraHakLalol()
            const jadinya = { status: 'success', kategoriacara: [] }
            if (hasil.status === 200) {
                jadinya.kategoriacara = hasil.data
            }
            dispatch(setKategoriacara(jadinya))
        }
    }
}
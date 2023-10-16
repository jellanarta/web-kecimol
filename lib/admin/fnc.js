import axios from "axios";
axios.defaults.withCredentials = true

// ambil semua kecimol yang memerlukan persetujuan
export const setujuiPendaftaranKecimol = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/admin/kecimol/menunggu-persetujuan`)
    } catch (error) {
        return error.response
    }
}
// proses setujui atau nonaktivkan kecimol
export const yakinSetujuiAtauNonaktivkan = async (idkecimol, link = 'setujui') => {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/admin/kecimol/${link}`, idkecimol)
    } catch (error) {
        return error.response
    }
}

// statistik dashboiard
export const statistikBulanTertentuAdmin = async data => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/admin/dashboard/statistik/${data.awal}/${data.akhir}`)
    } catch (error) {
        return error.response
    }
}
import axios from "axios";
axios.defaults.withCredentials = true
// mengambil data kecimol
export const getDataKecimolArta = async (path = 'beranda', idkecimol, tanggal) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/get-data/${path}/${idkecimol}/${tanggal}`)
    } catch (error) {
        return error.response
    }
}

// jadwal perkecimol
export const jadwalPerKecimol = async data => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/jadwal/${data.idkecimol}/${data.kategori}/${data.awal}/${data.akhir}`)
    } catch (error) {
        return error.response
    }
}


// semua orang ambil kecimol
export const publicAllKecimol = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/all-kecimol`)
    } catch (error) {
        return error.response
    }
}
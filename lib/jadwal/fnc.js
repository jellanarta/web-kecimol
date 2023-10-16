import axios from "axios";
axios.defaults.withCredentials = true

// create jadwal
export const userCreateJadwal = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error.response
    }
}
// cari jadwal untuk di edit
export const userCariJadwalUntukDiEdit = async (id, tanggal) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/get-to-change/${id}/${tanggal}`)
    } catch (error) {
        return error.response
    }
}

// user edit jadwal
export const userEditjadwal = async (idjadwal, data) => {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/update/${idjadwal}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error.response
    }
}

// user hapus jadwal
export const pemilikJadwalMauHapus = async idjadwal => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/hapus/${idjadwal}`)
    } catch (error) {
        return error.response
    }
}

// admin hapus jadwal kecimol
export const adminHapusJadwalKecimol = async idkecimol => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/admin/delete/${idkecimol}`)
    } catch (error) {
        return error.response
    }
}

// user get jadwal hari ini
export const jadwalHariIni = async tanggal => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/hariini/${tanggal}`)
    } catch (error) {
        return error.response
    }
}

// jadwal perkategori
export const jadwalWithKategori = async (kategori, tanggal) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/jadwal/perkategori/${kategori}/${tanggal}`)
    } catch (error) {
        return error.response
    }
}

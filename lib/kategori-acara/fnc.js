import axios from "axios";
axios.defaults.withCredentials = true

// admin get semua kategori acara
export const adminAmbilSemuaKategoriAcara = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/admin/kategori/get-all-kategori`)
    } catch (error) {
        return error.response
    }
}
// admin membuat kategori acara baru
export const adminCreateKategoriAcara = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/admin/kategori/create-kategori`, data)
    } catch (error) {
        return error.response
    }
}
// admin hapus kategori
export const adminDeleteKategori = async data => {
    try {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/admin/kategori/delete/${data}`)
    } catch (error) {
        return error.response
    }
}

// admin update kategori
export const adminUpdateKategori = async (data, idkategori) => {
    try {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/admin/kategori/update/${idkategori}`, data)

    } catch (error) {
        return error.response
    }
}
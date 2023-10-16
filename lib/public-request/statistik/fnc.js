import axios from "axios";
import { limaBulanJadwal } from "../../fnc";
import moment from "moment";
import 'moment/locale/id'
moment.locale('id')
axios.defaults.withCredentials = true


// membuat data statistik
export function membuatdatastatistik(datastatistik, bulanpilihan = null) {
    const warnawarni = ['2E35FF', 'F80505', '06C919', 'FF62D8', 'FFEB34', 'FF8B17', '5D7804', 'A10076', '0BF7FF', '7F7F7F', '05C6C3', '908E8D', 'E35C02', '02E315', '2802E3']
    const hasilnya = { loading: false, data: null }
    if (datastatistik && datastatistik.length) {
        const { awal, akhir } = limaBulanJadwal('cari awal dan akhir', bulanpilihan ? bulanpilihan : moment().format("MMMM YYYY"))
        const stardate = moment(awal)
        const terakhir = moment(akhir)
        let konterdate = stardate
        const semuatampil = []
        while (konterdate.isSameOrBefore(terakhir, 'day')) {
            semuatampil.push(konterdate.valueOf())
            konterdate.add(1, 'day')
        }
        const inidiaoke = []
        datastatistik.map((dt, idx) => {
            const tampung = { label: dt.nama, data: [], warna: '#' + warnawarni[idx] }
            const semuastatistik = dt.statistik
            if (semuastatistik.length) {
                const sementara = []
                semuatampil.map(dt => sementara.push({ tanggal: dt, data: 0 }))
                const simpananh = []
                sementara.map(dtdua => {
                    semuastatistik.map(dttiga => {
                        if (dtdua.tanggal === dttiga.createdAt) {
                            dtdua.data = dttiga.totalData
                        }
                    })
                    simpananh.push(dtdua)
                })
                tampung.data = simpananh
            } else {
                semuatampil.map(dt => tampung.data.push({ tanggal: dt, data: 0 }))
            }
            inidiaoke.push(tampung)
        })
        hasilnya.data = inidiaoke
    }
    return hasilnya
}

// menambahkan statistik kecimol
export const addStatistikKecimol = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user-public/statistik/kecimol`, data)
    } catch (error) {
        return error.response
    }
}

// kecimool mengambil statistik
export const statistikKecimolBulanLain = async (awal, akhir) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user-public/dashboard/kecimol/statistik/${awal}/${akhir}`)
    } catch (error) {
        return error.response
    }
}

// statistik perhalaman
export const addStatistikPerHalaman = async data => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user-public/statistik/perkategori`, data)
    } catch (error) {
        return error.response
    }
}